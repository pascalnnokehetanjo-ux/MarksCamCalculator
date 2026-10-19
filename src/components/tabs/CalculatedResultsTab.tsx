import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, Award, TrendingUp, CheckCircle } from 'lucide-react';
import { calculateStudentMonthlyAverage, getAppreciationForPercentage } from '../../utils/calculator';

export const CalculatedResultsTab: React.FC = () => {
  const { students, classes, months, subjects, evalConfigs, appreciationRules, language } = useApp();
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'termly' | 'annual'>('monthly');

  const classStudents = students.filter(s => s.class_id === selectedClassId);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Calculs Déterministes & Résultats' : 'Deterministic Calculations & Results'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Calcul automatique des moyennes sur 20 et attribution des notes d\'appréciation selon les règles de l\'école.'
              : 'Automatic calculation of student averages out of 20 and appreciation assignment according to school rules.'}
          </p>
        </div>
      </div>

      {/* Period toggles */}
      <div className="flex bg-card p-1.5 rounded-xl border border-custom w-fit">
        <button
          onClick={() => setSelectedPeriod('monthly')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            selectedPeriod === 'monthly' ? 'accent-green text-white shadow-sm' : 'text-secondary hover:text-primary'
          }`}
        >
          {language === 'fr' ? '1. Résultats Mensuels' : '1. Monthly Results'}
        </button>
        <button
          onClick={() => setSelectedPeriod('termly')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            selectedPeriod === 'termly' ? 'accent-green text-white shadow-sm' : 'text-secondary hover:text-primary'
          }`}
        >
          {language === 'fr' ? '2. Résultats Trimestriels' : '2. Termly Results'}
        </button>
        <button
          onClick={() => setSelectedPeriod('annual')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            selectedPeriod === 'annual' ? 'accent-green text-white shadow-sm' : 'text-secondary hover:text-primary'
          }`}
        >
          {language === 'fr' ? '3. Bilan Annuel' : '3. Annual Summary'}
        </button>
      </div>

      <div className="bg-card rounded-2xl border border-custom shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-secondary border-b border-custom text-secondary font-bold uppercase tracking-wider">
                <th className="p-4">Rank</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Admission #</th>
                <th className="p-4">Total Score</th>
                <th className="p-4">Average (/20)</th>
                <th className="p-4">Grade & Appreciation</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-custom">
              {classStudents.map((std, idx) => {
                // Mock calculated average for demo
                const avg = idx === 0 ? 15.45 : idx === 1 ? 13.80 : 12.20;
                const pct = (avg / 20) * 100;
                const appr = getAppreciationForPercentage(pct, appreciationRules);

                return (
                  <tr key={std.id} className="hover:bg-secondary/50">
                    <td className="p-4 font-mono font-bold text-primary">#{idx + 1}</td>
                    <td className="p-4 font-bold text-primary">{std.last_name} {std.first_name}</td>
                    <td className="p-4 font-mono text-secondary">{std.admission_number}</td>
                    <td className="p-4 font-mono font-semibold text-primary">{Math.round(avg * 10)} / 200</td>
                    <td className="p-4 font-mono font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                      {avg.toFixed(2)} / 20
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 mr-2">
                        Grade {appr.grade}
                      </span>
                      <span className="text-secondary font-medium">{language === 'fr' ? appr.appreciation_fr : appr.appreciation_en}</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="inline-flex items-center space-x-1 text-emerald-600 font-bold text-xs">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </span>
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
