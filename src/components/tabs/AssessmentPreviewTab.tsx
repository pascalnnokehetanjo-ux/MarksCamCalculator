import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, Award, BookOpen } from 'lucide-react';

export const AssessmentPreviewTab: React.FC = () => {
  const { competences, competenceItems, subjects, subSubjects, evalConfigs, language } = useApp();

  // Helper to calculate subject max mark
  const getSubjectMax = (subjectId: string) => {
    const cfg = evalConfigs[subjectId] || { oral: 5, written: 10, practical: 3, attitude: 2 };
    return Number(cfg.oral) + Number(cfg.written) + Number(cfg.practical) + Number(cfg.attitude);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Aperçu de la Structure & Calcul Automatique des Notes Max' : 'Assessment Structure & Calculated Maximum Marks Preview'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Règle 2 : La note maximale mensuelle d\'une compétence est la somme des notes maximales de toutes les matières actives qui y sont rattachées.'
              : 'Rule 2: Monthly maximum mark for a competence is derived from the sum of active subjects/sub-subjects linked to that competence.'}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {competences.map(comp => {
          const items = competenceItems.filter(ci => ci.competence_id === comp.id);
          
          // Calculate competence monthly total
          let compTotalMax = 0;
          items.forEach(item => {
            const linkedSubjects = subjects.filter(s => s.competence_item_id === item.id);
            linkedSubjects.forEach(s => {
              compTotalMax += getSubjectMax(s.id);
            });
          });

          return (
            <div key={comp.id} className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-custom">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl accent-green text-white flex items-center justify-center font-bold text-xs">
                    {comp.code}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-primary">{language === 'fr' ? comp.name_fr : comp.name_en}</h3>
                    <p className="text-xs text-secondary">{language === 'fr' ? comp.description_fr : comp.description_en}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider block">
                    {language === 'fr' ? 'Total Compétence' : 'Competence Total'}
                  </span>
                  <span className="font-mono text-lg font-black text-emerald-600 dark:text-emerald-400">
                    /{compTotalMax}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {items.map(item => {
                  const linkedSubjects = subjects.filter(s => s.competence_item_id === item.id);
                  if (linkedSubjects.length === 0) return null;

                  return (
                    <div key={item.id} className="bg-secondary p-4 rounded-xl border border-custom space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-amber-600">{item.code}</span>
                          <span className="text-xs font-bold text-primary">{language === 'fr' ? item.name_fr : item.name_en}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {linkedSubjects.map(s => {
                          const subjMax = getSubjectMax(s.id);
                          const cfg = evalConfigs[s.id] || { oral: 5, written: 10, practical: 3, attitude: 2 };

                          return (
                            <div key={s.id} className="bg-card p-3 rounded-lg border border-custom space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[11px] font-bold text-primary">{s.code}</span>
                                <span className="font-mono text-xs font-black text-emerald-600">/{subjMax}</span>
                              </div>
                              <p className="text-xs font-semibold text-primary truncate">{language === 'fr' ? s.name_fr : s.name_en}</p>
                              <p className="text-[10px] text-secondary">
                                Oral: {cfg.oral} | Written: {cfg.written} | Prac: {cfg.practical} | Att: {cfg.attitude}
                              </p>
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
        })}
      </div>
    </div>
  );
};
