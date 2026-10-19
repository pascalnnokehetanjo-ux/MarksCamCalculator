import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckSquare, Save, CheckCircle, Lock, Unlock, Search, AlertCircle } from 'lucide-react';
import { StudentMark, MarkStatus } from '../../types/markscam';

export const MarksEntryTab: React.FC = () => {
  const { students, classes, months, terms, subjects, evaluationTypes, evalConfigs, language } = useApp();
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [selectedMonthId, setSelectedMonthId] = useState(months[0]?.id || '');
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || '');

  // Local student marks state keyed by studentId_evalCode
  const [marksState, setMarksState] = useState<Record<string, { score: number; status: MarkStatus }>>(() => {
    // Seed initial demo marks for student 1 & 2
    return {
      'std-001_oral': { score: 4.5, status: 'verified' },
      'std-001_written': { score: 14.0, status: 'verified' },
      'std-001_practical': { score: 2.5, status: 'verified' },
      'std-001_attitude': { score: 1.8, status: 'verified' },
      'std-002_oral': { score: 3.5, status: 'draft' },
      'std-002_written': { score: 11.0, status: 'draft' },
      'std-002_practical': { score: 2.0, status: 'draft' },
      'std-002_attitude': { score: 1.5, status: 'draft' },
    };
  });

  const [successMsg, setSuccessMsg] = useState(false);

  const activeSubject = subjects.find(s => s.id === selectedSubjectId);
  const currentMax = evalConfigs[selectedSubjectId] || { oral: 5, written: 10, practical: 3, attitude: 2 };

  const classStudents = students.filter(s => s.class_id === selectedClassId);

  const handleScoreChange = (studentId: string, evalCode: string, val: string) => {
    const key = `${studentId}_${evalCode}`;
    const num = parseFloat(val) || 0;
    const max = evalCode === 'oral' ? currentMax.oral : evalCode === 'written' ? currentMax.written : evalCode === 'practical' ? currentMax.practical : currentMax.attitude;

    if (num > max || num < 0) return; // Prevent invalid score

    setMarksState(prev => ({
      ...prev,
      [key]: { score: num, status: 'draft' }
    }));
  };

  const handleVerify = (studentId: string) => {
    ['oral', 'written', 'practical', 'attitude'].forEach(code => {
      const key = `${studentId}_${code}`;
      if (marksState[key]) {
        marksState[key].status = 'verified';
      }
    });
    setMarksState({ ...marksState });
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <CheckSquare className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Saisie Manuelle & Vérification des Notes' : 'Manual Marks Entry & Verification'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Saisissez les notes (oral, écrit, pratique, attitude), vérifiez et verrouillez avant calcul.'
              : 'Enter evaluation scores, verify mandatory oral/written marks, and lock records.'}
          </p>
        </div>
        {successMsg && (
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold shadow-xs">
            <CheckCircle className="w-4 h-4" />
            <span>{language === 'fr' ? 'Notes enregistrées et vérifiées !' : 'Marks saved & verified!'}</span>
          </div>
        )}
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-card p-4 rounded-2xl border border-custom shadow-xs">
        <div>
          <label className="block text-xs font-semibold text-primary mb-1">Class / Classe</label>
          <select
            value={selectedClassId}
            onChange={e => setSelectedClassId(e.target.value)}
            className="w-full bg-secondary border border-custom rounded-xl px-3 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
          >
            {classes.map(c => <option key={c.id} value={c.id}>{language === 'fr' ? c.name_fr : c.name_en}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-primary mb-1">Month / Mois</label>
          <select
            value={selectedMonthId}
            onChange={e => setSelectedMonthId(e.target.value)}
            className="w-full bg-secondary border border-custom rounded-xl px-3 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
          >
            {months.map(m => <option key={m.id} value={m.id}>{language === 'fr' ? m.name_fr : m.name_en}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-primary mb-1">Subject / Matière</label>
          <select
            value={selectedSubjectId}
            onChange={e => setSelectedSubjectId(e.target.value)}
            className="w-full bg-secondary border border-custom rounded-xl px-3 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
          >
            {subjects.map(s => <option key={s.id} value={s.id}>[{s.code}] {language === 'fr' ? s.name_fr : s.name_en}</option>)}
          </select>
        </div>
      </div>

      {/* Marks Table */}
      <div className="bg-card rounded-2xl border border-custom shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-secondary border-b border-custom text-secondary font-bold uppercase tracking-wider">
                <th className="p-4">Student</th>
                <th className="p-4">Oral (Max {currentMax.oral})</th>
                <th className="p-4">Written (Max {currentMax.written})</th>
                <th className="p-4">Practical (Max {currentMax.practical})</th>
                <th className="p-4">Attitude (Max {currentMax.attitude})</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-custom">
              {classStudents.map(std => {
                const oralKey = `${std.id}_oral`;
                const writtenKey = `${std.id}_written`;
                const pracKey = `${std.id}_practical`;
                const attKey = `${std.id}_attitude`;

                const oral = marksState[oralKey]?.score ?? 0;
                const written = marksState[writtenKey]?.score ?? 0;
                const practical = marksState[pracKey]?.score ?? 0;
                const attitude = marksState[attKey]?.score ?? 0;
                const status = marksState[oralKey]?.status || 'draft';

                return (
                  <tr key={std.id} className="hover:bg-secondary/50">
                    <td className="p-4">
                      <span className="font-mono font-bold text-primary">{std.admission_number}</span>
                      <p className="font-semibold text-primary">{std.last_name} {std.first_name}</p>
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max={currentMax.oral}
                        value={oral}
                        onChange={e => handleScoreChange(std.id, 'oral', e.target.value)}
                        className="w-20 bg-secondary border border-custom rounded-lg px-2.5 py-1.5 font-mono font-bold text-primary focus:outline-none"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max={currentMax.written}
                        value={written}
                        onChange={e => handleScoreChange(std.id, 'written', e.target.value)}
                        className="w-20 bg-secondary border border-custom rounded-lg px-2.5 py-1.5 font-mono font-bold text-primary focus:outline-none"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max={currentMax.practical}
                        value={practical}
                        onChange={e => handleScoreChange(std.id, 'practical', e.target.value)}
                        className="w-20 bg-secondary border border-custom rounded-lg px-2.5 py-1.5 font-mono font-bold text-primary focus:outline-none"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max={currentMax.attitude}
                        value={attitude}
                        onChange={e => handleScoreChange(std.id, 'attitude', e.target.value)}
                        className="w-20 bg-secondary border border-custom rounded-lg px-2.5 py-1.5 font-mono font-bold text-primary focus:outline-none"
                      />
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        status === 'verified'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                      }`}>
                        {status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleVerify(std.id)}
                        className="px-3 py-1.5 rounded-lg accent-green text-white font-bold text-[11px] shadow-sm hover:opacity-95 cursor-pointer"
                      >
                        Verify
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
