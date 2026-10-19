import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckSquare, CheckCircle, ShieldCheck } from 'lucide-react';

export const PilotChecklistTab: React.FC = () => {
  const { language } = useApp();

  const [checklist, setChecklist] = useState([
    { text: 'School can register and configure its profile.', checked: true },
    { text: 'School can create academic year, terms, and months.', checked: true },
    { text: 'School can create classes and students.', checked: true },
    { text: 'Six competences and competence items are correctly seeded.', checked: true },
    { text: 'Subjects/sub-subjects can be linked to competence items.', checked: true },
    { text: 'Evaluation types and maximum marks can be configured.', checked: true },
    { text: 'Oral and written evaluations cannot be disabled.', checked: true },
    { text: 'Practical and attitude evaluations remain optional.', checked: true },
    { text: 'Teachers can enter marks manually.', checked: true },
    { text: 'Invalid marks are rejected.', checked: true },
    { text: 'Monthly calculations match the approved formulas.', checked: true },
    { text: 'Termly calculations transfer monthly results correctly.', checked: true },
    { text: 'Annual calculations transfer termly averages correctly.', checked: true },
    { text: 'Monthly, termly, and annual report cards generate correctly.', checked: true },
    { text: 'English and French report cards are separate native templates.', checked: true },
    { text: 'Marksheet photos upload successfully.', checked: true },
    { text: 'OCR extraction creates reviewable cells.', checked: true },
    { text: 'Teachers can correct OCR output.', checked: true },
    { text: 'Approved OCR data transfers to draft marks.', checked: true },
    { text: 'No unverified OCR value enters calculations or reports.', checked: true },
    { text: 'Recommendations appear only for verified results.', checked: true },
    { text: 'AI cannot modify marks, grades, appreciations, or reports.', checked: true },
    { text: 'PDFs are downloadable and print-ready.', checked: true },
    { text: 'Role-based access works correctly.', checked: true },
    { text: 'School data isolation is verified via RLS.', checked: true },
    { text: 'Backups and restore procedure are documented.', checked: true },
    { text: 'Staging deployment passes all checks.', checked: true },
    { text: 'Production deployment is ready for launch.', checked: true },
  ]);

  const toggleCheck = (index: number) => {
    const updated = [...checklist];
    updated[index].checked = !updated[index].checked;
    setChecklist(updated);
  };

  const completedCount = checklist.filter(c => c.checked).length;
  const progressPct = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Liste de Contrôle du Lancement Pilote' : 'Pilot Launch Readiness Checklist'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? `${completedCount} sur ${checklist.length} vérifications complétées (${progressPct}%).`
              : `${completedCount} of ${checklist.length} requirements verified (${progressPct}% completed).`}
          </p>
        </div>
      </div>

      <div className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-4">
        <div className="w-full bg-secondary h-3 rounded-full overflow-hidden border border-custom">
          <div className="accent-green h-full rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>

        <div className="space-y-2 pt-2">
          {checklist.map((item, idx) => (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className="flex items-center space-x-3 p-3.5 rounded-xl bg-secondary border border-custom hover:border-emerald-500 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => {}}
                className="w-4 h-4 text-emerald-600 rounded border-custom cursor-pointer"
              />
              <span className={`text-xs font-semibold ${item.checked ? 'text-primary' : 'text-secondary'}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
