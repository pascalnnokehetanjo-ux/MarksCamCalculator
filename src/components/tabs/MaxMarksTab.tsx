import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sliders, Save, Check } from 'lucide-react';

export const MaxMarksTab: React.FC = () => {
  const { classes, subjects, language } = useApp();
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [maxMarks, setMaxMarks] = useState<Record<string, number>>({
    'subj-math': 20,
    'subj-eng': 20,
    'subj-fre': 20,
    'subj-sci': 20,
    'subj-hist': 20,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <Sliders className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Configuration des Notes Max par Matière et Classe' : 'Class-Subject Maximum Marks Configuration'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Définissez la note maximale (ex: /20, /10) pour chaque matière par classe.'
              : 'Configure the maximum mark (e.g. /20, /10) for each subject per class.'}
          </p>
        </div>
        {saved && (
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold shadow-xs">
            <Check className="w-4 h-4" />
            <span>{language === 'fr' ? 'Mis à jour !' : 'Updated successfully!'}</span>
          </div>
        )}
      </div>

      <div className="bg-card p-4 rounded-2xl border border-custom shadow-xs flex items-center space-x-4">
        <label className="text-xs font-semibold text-primary">Select Class / Classe :</label>
        <select
          value={selectedClassId}
          onChange={e => setSelectedClassId(e.target.value)}
          className="bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
        >
          {classes.map(c => (
            <option key={c.id} value={c.id}>{language === 'fr' ? c.name_fr : c.name_en}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSave} className="bg-card rounded-2xl border border-custom shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-secondary border-b border-custom text-secondary font-bold uppercase tracking-wider">
                <th className="p-4">Code</th>
                <th className="p-4">{language === 'fr' ? 'Matière' : 'Subject'}</th>
                <th className="p-4">{language === 'fr' ? 'État' : 'Status'}</th>
                <th className="p-4">{language === 'fr' ? 'Note Maximale' : 'Maximum Mark'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-custom">
              {subjects.map(subj => (
                <tr key={subj.id} className="hover:bg-secondary/50">
                  <td className="p-4 font-mono font-bold text-primary">{subj.code}</td>
                  <td className="p-4 font-semibold text-primary">{language === 'fr' ? subj.name_fr : subj.name_en}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                      Enabled
                    </span>
                  </td>
                  <td className="p-4">
                    <input
                      type="number"
                      value={maxMarks[subj.id] || 20}
                      onChange={e => setMaxMarks({ ...maxMarks, [subj.id]: Number(e.target.value) })}
                      className="w-24 bg-secondary border border-custom rounded-xl px-3 py-1.5 text-xs font-bold text-primary focus:outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-custom flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl accent-green text-white font-bold text-xs shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{language === 'fr' ? 'Enregistrer les Notes Max' : 'Save Maximum Marks'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
