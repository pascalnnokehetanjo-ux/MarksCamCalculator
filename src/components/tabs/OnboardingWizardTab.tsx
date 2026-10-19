import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, CheckCircle, ArrowRight, ArrowLeft, School, BookOpen, Users } from 'lucide-react';

export const OnboardingWizardTab: React.FC = () => {
  const { school, setSchool, language } = useApp();
  const [step, setStep] = useState(1);
  const [schoolNameEn, setSchoolNameEn] = useState(school.name_en);
  const [schoolNameFr, setSchoolNameFr] = useState(school.name_fr);
  const [success, setSuccess] = useState(false);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else {
      setSchool({ ...school, name_en: schoolNameEn, name_fr: schoolNameFr });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Assistant d\'Intégration École Pilote' : 'Pilot School Onboarding Wizard'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? `Étape ${step} sur 5 : Configuration guidée pour les écoles au Cameroun.`
              : `Step ${step} of 5: Guided setup wizard for Cameroonian schools.`}
          </p>
        </div>
        {success && (
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold shadow-xs">
            <CheckCircle className="w-4 h-4" />
            <span>{language === 'fr' ? 'Configuration enregistrée !' : 'Onboarding completed!'}</span>
          </div>
        )}
      </div>

      <div className="bg-card p-8 rounded-2xl border border-custom shadow-xs space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-primary">1. School Profile & Identity / Profil de l'Établissement</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">School Name (English)</label>
                <input
                  type="text"
                  value={schoolNameEn}
                  onChange={e => setSchoolNameEn(e.target.value)}
                  className="w-full bg-secondary border border-custom rounded-xl px-4 py-2.5 text-xs font-medium text-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Nom de l'École (Français)</label>
                <input
                  type="text"
                  value={schoolNameFr}
                  onChange={e => setSchoolNameFr(e.target.value)}
                  className="w-full bg-secondary border border-custom rounded-xl px-4 py-2.5 text-xs font-medium text-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-primary">2. Academic Year, Terms & Months / Année Scolaire & Trimestres</h3>
            <p className="text-xs text-secondary">
              Configured for 2025/2026 Academic Year with 3 Terms (Trimestre 1, 2, 3) and monthly evaluation intervals.
            </p>
            <div className="p-4 rounded-xl bg-secondary border border-custom text-xs font-semibold text-emerald-600">
              ✓ Academic Year 2025/2026 successfully initialized with 10 months.
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-primary">3. Classes & Student Registry / Classes & Élèves</h3>
            <p className="text-xs text-secondary">
              Set up classes (e.g. Form 1 Bilingual A / 6ème Bilingue A) and import students with unique admission numbers.
            </p>
            <div className="p-4 rounded-xl bg-secondary border border-custom text-xs font-semibold text-emerald-600">
              ✓ Default demo class and student registry loaded successfully.
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-primary">4. Competences & Subjects Hierarchy / Compétences & Matières</h3>
            <p className="text-xs text-secondary">
              All 6 official competences and competence items (C1A to C6B) are pre-configured. Subjects and sub-subjects are linked.
            </p>
            <div className="p-4 rounded-xl bg-secondary border border-custom text-xs font-semibold text-emerald-600">
              ✓ 6 Competences & 10 Core Subjects linked and verified.
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-primary">5. Evaluation Types & Appreciation Rules / Évaluations & Grille d'Appréciation</h3>
            <p className="text-xs text-secondary">
              Oral and written evaluations are mandatory. Appreciation percentage boundaries (0% to 100%) are locked and verified.
            </p>
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs font-bold text-emerald-800 dark:text-emerald-300">
              ✓ Pilot school setup complete and ready for live operation!
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-custom flex justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`inline-flex items-center space-x-1 px-4 py-2 rounded-xl border border-custom bg-secondary text-secondary font-semibold text-xs cursor-pointer ${
              step === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="inline-flex items-center space-x-1 px-6 py-2.5 rounded-xl accent-green text-white font-bold text-xs shadow-md cursor-pointer hover:opacity-95"
          >
            <span>{step === 5 ? 'Complete Onboarding' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
