import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sliders, Save, Check } from 'lucide-react';

export const MaxMarksConfigTab: React.FC = () => {
  const { subjects, subSubjects, evalConfigs, setEvalConfigs, language } = useApp();
  const [success, setSuccess] = useState(false);

  const handleUpdate = (id: string, evalType: 'oral' | 'written' | 'practical' | 'attitude', val: number) => {
    const current = evalConfigs[id] || { oral: 5, written: 10, practical: 3, attitude: 2 };
    setEvalConfigs({
      ...evalConfigs,
      [id]: { ...current, [evalType]: Number(val) }
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <Sliders className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Configuration des Notes Max par Type d\'Évaluation' : 'Evaluation-Type Maximum Marks Configuration'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Règle 1 : La note maximale mensuelle d\'une matière est la somme des notes maximales de ses types d\'évaluation activés (Oral, Écrit, Pratique, Attitude).'
              : 'Rule 1: Monthly maximum mark for a subject/sub-subject is the sum of maximum marks of its enabled evaluation types.'}
          </p>
        </div>
        {success && (
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold shadow-xs">
            <Check className="w-4 h-4" />
            <span>{language === 'fr' ? 'Enregistré avec succès !' : 'Saved successfully!'}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-card rounded-2xl border border-custom shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-secondary border-b border-custom text-secondary font-bold uppercase tracking-wider">
                  <th className="p-4">Code / Subject</th>
                  <th className="p-4">Oral (Mandatory)</th>
                  <th className="p-4">Written (Mandatory)</th>
                  <th className="p-4">Practical (Optional)</th>
                  <th className="p-4">Attitude (Optional)</th>
                  <th className="p-4 text-right">Total Monthly Max</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-custom">
                {subjects.map(subj => {
                  const cfg = evalConfigs[subj.id] || { oral: 5, written: 10, practical: 3, attitude: 2 };
                  const total = Number(cfg.oral) + Number(cfg.written) + Number(cfg.practical) + Number(cfg.attitude);

                  return (
                    <tr key={subj.id} className="hover:bg-secondary/50">
                      <td className="p-4">
                        <span className="font-mono font-bold text-emerald-600">{subj.code}</span>
                        <p className="font-semibold text-primary">{language === 'fr' ? subj.name_fr : subj.name_en}</p>
                      </td>
                      <td className="p-4">
                        <input
                          type="number"
                          step="0.5"
                          min="0.5"
                          required
                          value={cfg.oral}
                          onChange={e => handleUpdate(subj.id, 'oral', Number(e.target.value))}
                          className="w-20 bg-secondary border border-custom rounded-lg px-2.5 py-1.5 font-mono font-bold text-primary focus:outline-none"
                        />
                      </td>
                      <td className="p-4">
                        <input
                          type="number"
                          step="0.5"
                          min="0.5"
                          required
                          value={cfg.written}
                          onChange={e => handleUpdate(subj.id, 'written', Number(e.target.value))}
                          className="w-20 bg-secondary border border-custom rounded-lg px-2.5 py-1.5 font-mono font-bold text-primary focus:outline-none"
                        />
                      </td>
                      <td className="p-4">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          value={cfg.practical}
                          onChange={e => handleUpdate(subj.id, 'practical', Number(e.target.value))}
                          className="w-20 bg-secondary border border-custom rounded-lg px-2.5 py-1.5 font-mono font-bold text-primary focus:outline-none"
                        />
                      </td>
                      <td className="p-4">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          value={cfg.attitude}
                          onChange={e => handleUpdate(subj.id, 'attitude', Number(e.target.value))}
                          className="w-20 bg-secondary border border-custom rounded-lg px-2.5 py-1.5 font-mono font-bold text-primary focus:outline-none"
                        />
                      </td>
                      <td className="p-4 text-right font-mono font-black text-base text-emerald-600 dark:text-emerald-400">
                        /{total}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-custom flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl accent-green text-white font-bold text-xs shadow-md cursor-pointer hover:opacity-95"
            >
              <Save className="w-4 h-4" />
              <span>{language === 'fr' ? 'Enregistrer les Notes Max' : 'Save Evaluation Max Marks'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
