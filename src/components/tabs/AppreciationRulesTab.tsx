import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Percent, CheckCircle, AlertTriangle, Edit, Save } from 'lucide-react';
import { validateAppreciationRules } from '../../utils/validators';

export const AppreciationRulesTab: React.FC = () => {
  const { appreciationRules, setAppreciationRules, language } = useApp();
  const [rules, setRules] = useState(appreciationRules);
  const [successMsg, setSuccessMsg] = useState(false);

  const validation = validateAppreciationRules(rules);

  const handleUpdateRule = (index: number, field: string, value: any) => {
    const updated = [...rules];
    updated[index] = { ...updated[index], [field]: value };
    setRules(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation.isValid) return;
    setAppreciationRules(rules);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <Percent className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Règles d\'Appréciation (0% - 100%)' : 'Appreciation Rules & Boundaries'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Ces règles s\'appliquent indépendamment de la note maximale (/20, /10, etc.) en convertissant en pourcentage.'
              : 'Configured as percentages so rules apply uniformly across any maximum mark (/20, /10, etc.).'}
          </p>
        </div>
        {successMsg && (
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold shadow-xs">
            <CheckCircle className="w-4 h-4" />
            <span>{language === 'fr' ? 'Règles enregistrées !' : 'Rules saved successfully!'}</span>
          </div>
        )}
      </div>

      {/* Validation Banner */}
      <div className={`p-4 rounded-xl border flex items-start space-x-3 ${
        validation.isValid
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
          : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
      }`}>
        {validation.isValid ? <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" /> : <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />}
        <div className="text-xs">
          <p className="font-bold">
            {validation.isValid
              ? (language === 'fr' ? 'Grille valide : Couverture continue de 0.0% à 100.0% sans lacune ni chevauchement.' : 'Grid Valid: Continuous coverage from 0.0% to 100.0% without gaps or overlaps.')
              : (language === 'fr' ? 'Attention : Erreurs de validation détectées dans les plages d\'appréciation.' : 'Validation Warning: Errors detected in appreciation percentage ranges.')}
          </p>
          {!validation.isValid && (
            <ul className="list-disc pl-4 mt-1 space-y-0.5">
              {validation.errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          )}
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-card rounded-2xl border border-custom shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-secondary border-b border-custom text-secondary font-bold uppercase tracking-wider">
                <th className="p-4">{language === 'fr' ? 'Grade / Note' : 'Grade'}</th>
                <th className="p-4">{language === 'fr' ? 'Min %' : 'Min %'}</th>
                <th className="p-4">{language === 'fr' ? 'Max %' : 'Max %'}</th>
                <th className="p-4">{language === 'fr' ? 'Appréciation (Anglais)' : 'Appreciation (English)'}</th>
                <th className="p-4">{language === 'fr' ? 'Appréciation (Français)' : 'Appreciation (French)'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-custom">
              {rules.map((rule, idx) => (
                <tr key={rule.id} className="hover:bg-secondary/50">
                  <td className="p-4">
                    <input
                      type="text"
                      value={rule.grade}
                      onChange={e => handleUpdateRule(idx, 'grade', e.target.value)}
                      className="w-16 bg-secondary border border-custom rounded-lg px-2.5 py-1.5 font-bold text-center text-primary focus:outline-none"
                    />
                  </td>
                  <td className="p-4">
                    <input
                      type="number"
                      step="0.1"
                      value={rule.min_percentage}
                      onChange={e => handleUpdateRule(idx, 'min_percentage', Number(e.target.value))}
                      className="w-24 bg-secondary border border-custom rounded-lg px-3 py-1.5 font-mono text-primary focus:outline-none"
                    />
                  </td>
                  <td className="p-4">
                    <input
                      type="number"
                      step="0.1"
                      value={rule.max_percentage}
                      onChange={e => handleUpdateRule(idx, 'max_percentage', Number(e.target.value))}
                      className="w-24 bg-secondary border border-custom rounded-lg px-3 py-1.5 font-mono text-primary focus:outline-none"
                    />
                  </td>
                  <td className="p-4">
                    <input
                      type="text"
                      value={rule.appreciation_en}
                      onChange={e => handleUpdateRule(idx, 'appreciation_en', e.target.value)}
                      className="w-full bg-secondary border border-custom rounded-lg px-3 py-1.5 text-primary focus:outline-none"
                    />
                  </td>
                  <td className="p-4">
                    <input
                      type="text"
                      value={rule.appreciation_fr}
                      onChange={e => handleUpdateRule(idx, 'appreciation_fr', e.target.value)}
                      className="w-full bg-secondary border border-custom rounded-lg px-3 py-1.5 text-primary focus:outline-none"
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
            disabled={!validation.isValid}
            className={`inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-bold text-xs shadow-md ${
              validation.isValid ? 'accent-green cursor-pointer hover:opacity-95' : 'bg-slate-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{language === 'fr' ? 'Enregistrer les Règles' : 'Save Appreciation Rules'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
