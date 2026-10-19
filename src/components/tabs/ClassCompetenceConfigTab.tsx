import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sliders, AlertTriangle, CheckCircle } from 'lucide-react';

export const ClassCompetenceConfigTab: React.FC = () => {
  const { classes, competences, competenceItems, classCompetenceConfigs, setClassCompetenceConfigs, language } = useApp();
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');

  const handleToggle = (competenceItemId: string) => {
    const existing = classCompetenceConfigs.find(
      c => c.class_id === selectedClassId && c.competence_item_id === competenceItemId
    );

    if (existing) {
      setClassCompetenceConfigs(classCompetenceConfigs.map(c =>
        c.id === existing.id ? { ...c, is_active: !c.is_active } : c
      ));
    } else {
      const newConfig = {
        id: `ccic-${Date.now()}`,
        school_id: 'school-gbhs-yaounde',
        class_id: selectedClassId,
        competence_item_id: competenceItemId,
        is_active: true,
        order_index: classCompetenceConfigs.length + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setClassCompetenceConfigs([...classCompetenceConfigs, newConfig]);
    }
  };

  // Check if both C6A1 and C6A2 are active
  const isC6A1Active = classCompetenceConfigs.some(c => c.class_id === selectedClassId && c.competence_item_id === 'ci-6a1' && c.is_active);
  const isC6A2Active = classCompetenceConfigs.some(c => c.class_id === selectedClassId && c.competence_item_id === 'ci-6a2' && c.is_active);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <Sliders className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Configuration des Éléments de Compétence par Classe' : 'Class Competence Item Configuration'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Activez ou désactivez les éléments de compétence évalués pour chaque classe.'
              : 'Activate or deactivate individual competence items assessed per class.'}
          </p>
        </div>
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

      {isC6A1Active && isC6A2Active && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start space-x-3 text-amber-800 dark:text-amber-300">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold">
              {language === 'fr' ? 'Avertissement Competence 6 (C6A1 & C6A2 activez simultanément)' : 'Competence 6 Warning: Both C6A1 and C6A2 are activated.'}
            </p>
            <p className="mt-0.5">
              {language === 'fr'
                ? 'C6A1 (élèves valides) et C6A2 (élèves handicapés physiques) représentent des catégories d\'apprenants différentes et ne s\'appliquent normalement pas au même élève simultanément.'
                : 'C6A1 (physically non-challenged) and C6A2 (physically challenged) represent different learner categories and should normally not both apply to the same learner.'}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {competences.map(comp => {
          const items = competenceItems.filter(ci => ci.competence_id === comp.id);
          return (
            <div key={comp.id} className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-primary flex items-center space-x-2">
                <span className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                  {comp.code}
                </span>
                <span>{language === 'fr' ? comp.name_fr : comp.name_en}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-custom">
                {items.map(item => {
                  const cfg = classCompetenceConfigs.find(
                    c => c.class_id === selectedClassId && c.competence_item_id === item.id
                  );
                  const isActive = cfg ? cfg.is_active : true; // default active

                  return (
                    <div key={item.id} className="bg-secondary p-4 rounded-xl border border-custom flex items-center justify-between">
                      <div className="space-y-0.5 pr-2">
                        <span className="font-mono text-[10px] font-bold text-emerald-600">{item.code}</span>
                        <p className="text-xs font-bold text-primary">{language === 'fr' ? item.name_fr : item.name_en}</p>
                      </div>

                      <button
                        onClick={() => handleToggle(item.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {isActive ? (language === 'fr' ? 'Actif' : 'Active') : (language === 'fr' ? 'Inactif' : 'Inactive')}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
