import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Plus, CheckCircle, Clock } from 'lucide-react';

export const AcademicsTab: React.FC = () => {
  const { academicYears, terms, months, language } = useApp();
  const [activeYearId] = useState(academicYears[0]?.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Années Scolaires, Trimestres & Mois' : 'Academic Years, Terms & Months'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Structure temporelle officielle divisée en 3 trimestres et mois configurables.'
              : 'Official termly structure supporting 3 terms and configurable monthly evaluation intervals.'}
          </p>
        </div>
      </div>

      {/* Academic Years */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {academicYears.map(ay => (
          <div key={ay.id} className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                {ay.is_active ? (language === 'fr' ? 'Année Active' : 'Active Year') : 'Inactive'}
              </span>
              <span className="text-xs text-secondary font-mono">{ay.start_date} to {ay.end_date}</span>
            </div>
            <h3 className="text-lg font-bold text-primary">
              {language === 'fr' ? ay.name_fr : ay.name_en}
            </h3>
          </div>
        ))}
      </div>

      {/* Terms & Months Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-primary tracking-wider uppercase">
          {language === 'fr' ? 'Trimestres (Term 1, 2, 3) & Mois' : 'Terms & Months Structure'}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {terms.map(term => {
            const termMonths = months.filter(m => m.term_id === term.id);
            return (
              <div key={term.id} className="bg-card p-5 rounded-2xl border border-custom shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl accent-green text-white flex items-center justify-center font-bold text-xs">
                    T{term.order_index}
                  </span>
                  <span className="text-xs font-mono text-secondary">{term.start_date} - {term.end_date}</span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-primary">{language === 'fr' ? term.name_fr : term.name_en}</h4>
                </div>

                <div className="space-y-2 pt-2 border-t border-custom">
                  <p className="text-xs font-semibold text-secondary">
                    {language === 'fr' ? 'Mois inclus :' : 'Configured Months:'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {termMonths.map(m => (
                      <span key={m.id} className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-secondary text-primary border border-custom">
                        {language === 'fr' ? m.name_fr : m.name_en}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
