import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sliders, Shield } from 'lucide-react';

export const EvalConfigTab: React.FC = () => {
  const { evaluationTypes, language } = useApp();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <Sliders className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Configuration des Types d\'Évaluation par Matière' : 'Evaluation-Type Configuration per Subject'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Oral et écrit sont obligatoires par défaut. Activez ou désactivez les types optionnels (pratique, attitude).'
              : 'Oral and written are mandatory. Enable or disable optional types (practical, attitude) per subject.'}
          </p>
        </div>
      </div>

      <div className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-4">
        <div className="flex items-center space-x-3 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-3.5 rounded-xl border border-amber-200 dark:border-amber-800">
          <Shield className="w-5 h-5 shrink-0" />
          <span>
            {language === 'fr'
              ? 'Règle ministérielle : Les notes d\'Oral et d\'Écrit ne peuvent pas être désactivées ou rendues optionnelles.'
              : 'Ministerial Rule: Oral and Written evaluation types cannot be disabled or made optional.'}
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {evaluationTypes.map(et => (
            <div key={et.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary border border-custom">
              <div>
                <p className="font-bold text-primary text-sm">{language === 'fr' ? et.name_fr : et.name_en}</p>
                <p className="text-xs text-secondary">Code: {et.code} {et.is_mandatory ? '(Mandatory)' : '(Optional)'}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${et.is_mandatory ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300'}`}>
                  {et.is_mandatory ? 'Always Enabled & Required' : 'Optional'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
