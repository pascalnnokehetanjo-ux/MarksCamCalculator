import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckSquare, Shield } from 'lucide-react';

export const EvaluationTypesTab: React.FC = () => {
  const { evaluationTypes, language } = useApp();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <CheckSquare className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Types d\'Évaluation (Oral, Écrit, Pratique, Attitude)' : 'Evaluation Types Configuration'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Oral et écrit sont obligatoires par défaut. Pratique et attitude sont optionnels.'
              : 'Oral and written evaluations are mandatory by default. Practical and attitude are optional.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {evaluationTypes.map(et => (
          <div key={et.id} className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                et.is_mandatory
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
              }`}>
                {et.is_mandatory ? (language === 'fr' ? 'Obligatoire' : 'Mandatory') : (language === 'fr' ? 'Optionnel' : 'Optional')}
              </span>
              <span className="font-mono text-xs font-semibold text-secondary">{et.code}</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-primary">{language === 'fr' ? et.name_fr : et.name_en}</h3>
              <p className="text-xs text-secondary mt-1">
                {et.is_mandatory
                  ? (language === 'fr' ? 'Requis pour toutes les matières du système.' : 'Required for all subject evaluations.')
                  : (language === 'fr' ? 'Activé selon le choix de la matière.' : 'Configurable per subject evaluation.')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
