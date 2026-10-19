import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, ShieldCheck, Award, FileText, ArrowRight, BookOpen, Users, BarChart3, Globe2 } from 'lucide-react';

export const LandingHero: React.FC = () => {
  const { language, setViewMode } = useApp();

  const content = {
    en: {
      heroHeading: 'The Ultimate Bilingual Assessment SaaS for Cameroonian Schools',
      heroSub: 'Streamline student records, competency evaluations, class configurations, and ministerial report grading for both Anglophone and Francophone sub-systems in one secure platform.',
      ctaPrimary: 'Launch SaaS Dashboard',
      ctaSecondary: 'Explore Database & Schema',
      featuresTitle: 'Built for Cameroonian Educational Excellence',
      feature1Title: 'Dual Anglophone & Francophone Curricula',
      feature1Desc: 'Native, independent English and French content fields for every school entity, subject, and competence.',
      feature2Title: 'Competency-Based Assessment (CBA)',
      feature2Desc: 'Pre-configured with official Cameroonian competency scales (CNA, CPA, CA, Expert) and flexible grading.',
      feature3Title: 'Multi-Tenant School Isolation',
      feature3Desc: 'Secure database architecture ensuring complete data privacy and school-level separation.',
      pricingTitle: 'Transparent Pricing for Every Institution',
      pricingSub: 'Flexible subscription plans tailored for nursery, primary, and secondary schools across Cameroon.',
      plan1Name: 'Foundation Tier',
      plan1Price: 'Free for Pilot',
      plan1Desc: 'Ideal for single-campus testing and basic administration setup.',
      plan2Name: 'Standard Institution',
      plan2Price: ' 150,000 XAF / yr',
      plan2Desc: 'Full multi-class student registry, evaluation types, and appreciation rules.',
      plan3Name: 'National Enterprise',
      plan3Price: 'Custom',
      plan3Desc: 'For multi-campus school networks with priority ministerial reporting support.',
    },
    fr: {
      heroHeading: 'La Plateforme SaaS Bilingue d\'Évaluation Scolaire au Cameroun',
      heroSub: 'Gérez efficacement les dossiers des élèves, l\'évaluation par compétences, la configuration des classes et les bulletins pour les sous-systèmes anglophone et francophone.',
      ctaPrimary: 'Lancer le Tableau de Bord',
      ctaSecondary: 'Voir le Schéma de Base de Données',
      featuresTitle: 'Conforme aux Exigences du Système Éducatif Camerounais',
      feature1Title: 'Bilinguisme Intégral Anglais & Français',
      feature1Desc: 'Champs natifs indépendants en anglais et en français pour chaque établissement, matière et compétence.',
      feature2Title: 'Approche Par Compétences (APC)',
      feature2Desc: 'Pré-configuré avec les échelles d\'appréciation officielles (CNA, CPA, CA, Expert) et barèmes modulables.',
      feature3Title: 'Isolation Multilocataire Sécurisée',
      feature3Desc: 'Architecture de base de données robuste garantissant une stricte étanchéité des données par école.',
      pricingTitle: 'Tarifs Transparents Adaptés à Votre Établissement',
      pricingSub: 'Des forfaits flexibles conçus pour les écoles maternelles, primaires et secondaires du Cameroun.',
      plan1Name: 'Offre Pilote',
      plan1Price: 'Gratuit (Pilote)',
      plan1Desc: 'Idéal pour le test d\'établissement unique et la configuration de base.',
      plan2Name: 'Établissement Standard',
      plan2Price: '150 000 XAF / an',
      plan2Desc: 'Registre complet des élèves, types d\'évaluation et règles d\'appréciation.',
      plan3Name: 'Réseau National',
      plan3Price: 'Sur Mesure',
      plan3Desc: 'Pour les groupes scolaires multi-campus avec support prioritaire ministériel.',
    },
    ha: {
      heroHeading: 'Mafi kyawun Tsarin Tantance Makarantu na Kasar Kamaru da Harsuna Biyu',
      heroSub: 'Sarrafa bayanan dalibai, tantance kwarewa, da kuma tsara ajujuwa don tsarin Turanci da Faransanci a wuri guda.',
      ctaPrimary: 'Buɗe Shaafin Kula da Makaranta',
      ctaSecondary: 'Bincika Tsarin Bayanai',
      featuresTitle: 'An Gina shi Don Inganta Ilimi a Kamaru',
      feature1Title: 'Tsarin Turanci da Faransanci tare',
      feature1Desc: 'Fuskokin harsuna biyu masu zaman kansu ga kowane sashi da darasi.',
      feature2Title: 'Tantancewa bisa ga Kwarewa (CBA)',
      feature2Desc: 'An riga an saita matakan bayar da daraja na hukuma (CNA, CPA, CA, Expert).',
      feature3Title: 'Tsaro da Keɓance Bayanan Makaranta',
      feature3Desc: 'Cikakken tsaro da keɓance bayanan kowace makaranta ta musamman.',
      pricingTitle: 'Farashin Da Ya Dace Da Kowane Makaranta',
      pricingSub: 'Tsare-tsare masu sauƙi don makarantun firamare da sakandare a Kamaru.',
      plan1Name: 'Matakin Farko',
      plan1Price: 'Kyauta',
      plan1Desc: 'Mafi dacewa don gwaji da saita asalin makaranta.',
      plan2Name: 'Makaranta ta Yau da Kullum',
      plan2Price: '150,000 XAF / shekara',
      plan2Desc: 'Cikakken rijistar dalibai da ka\'idojin jarrabawa.',
      plan3Name: 'Babban Kamfanoni',
      plan3Price: 'Na Musamman',
      plan3Desc: 'Don cibiyoyin da ke da harabar makaranta fiye da ɗaya.',
    },
  }[language];

  return (
    <div className="min-h-screen bg-primary text-primary transition-colors duration-200">
      
      {/* Hero Section (2-Column Design) */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading, Paragraph, CTA */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{language === 'fr' ? 'Conforme au MINESEC & MINEDUB' : language === 'ha' ? 'Hukumar Ilimi ta Kamaru' : 'Official Cameroonian Education Standards'}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-primary">
                {content.heroHeading}
              </h1>

              <p className="text-lg sm:text-xl text-secondary leading-relaxed">
                {content.heroSub}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <button
                  onClick={() => setViewMode('dashboard')}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl accent-green text-white font-bold text-base shadow-lg hover:opacity-95 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>{content.ctaPrimary}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setViewMode('dashboard')}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl border border-custom bg-secondary text-primary font-semibold text-base hover:bg-card transition-all cursor-pointer"
                >
                  <FileText className="w-5 h-5 text-secondary" />
                  <span>{content.ctaSecondary}</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-custom">
                <div>
                  <p className="text-2xl font-black text-primary">100%</p>
                  <p className="text-xs text-secondary">{language === 'fr' ? 'Bilingue Angl./Fr.' : language === 'ha' ? 'Harsuna Biyu' : 'Bilingual Native'}</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-primary">6</p>
                  <p className="text-xs text-secondary">{language === 'fr' ? 'Compétences APC' : language === 'ha' ? 'Kwarewa' : 'Core Competences'}</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-primary">0% - 100%</p>
                  <p className="text-xs text-secondary">{language === 'fr' ? 'Grille d\'Appréciation' : language === 'ha' ? 'Tsarin Daraja' : 'Appreciation Rules'}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Product Demo Card / Illustration */}
            <div className="lg:col-span-5">
              <div className="bg-card rounded-2xl border border-custom p-6 shadow-xl relative">
                <div className="absolute -top-3 -right-3 accent-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Phase 1 Foundation
                </div>

                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-custom">
                  <div className="w-12 h-12 rounded-xl accent-green text-white flex items-center justify-center font-bold text-xl">
                    GB
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-primary">Gov. Bilingual High School Yaoundé</h3>
                    <p className="text-xs text-secondary">Lycée Bilingue d'État de Yaoundé</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-secondary p-3.5 rounded-xl border border-custom flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <div>
                        <p className="text-xs font-semibold text-primary">Student Registry</p>
                        <p className="text-[11px] text-secondary">Form 1 Bilingual A & 5ème</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="bg-secondary p-3.5 rounded-xl border border-custom flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <div>
                        <p className="text-xs font-semibold text-primary">10 Core Subjects Configured</p>
                        <p className="text-[11px] text-secondary">Maths, English, French, Physics...</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 rounded-full">
                      Synced
                    </span>
                  </div>

                  <div className="bg-secondary p-3.5 rounded-xl border border-custom flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <p className="text-xs font-semibold text-primary">Appreciation Scale (0% - 100%)</p>
                        <p className="text-[11px] text-secondary">CNA, CPA, CA, Expert (A+)</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 rounded-full">
                      Verified
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-custom flex items-center justify-between text-xs text-secondary">
                  <span>Multi-Tenant School Isolation</span>
                  <span className="font-semibold text-primary">PostgreSQL / Supabase</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features & Benefits Section */}
      <section className="py-20 bg-secondary border-t border-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary">
              {content.featuresTitle}
            </h2>
            <p className="text-base text-secondary">
              {language === 'fr'
                ? 'Une architecture robuste conçue pour répondre aux exigences des examens officiels et du contrôle continu.'
                : language === 'ha'
                ? 'Tsari mai ƙarfi da aka ƙera don biyan buƙatun makarantu a Kamaru.'
                : 'Engineered specifically for Cameroonian school administrators, teachers, and ministry compliance.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl border border-custom shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl accent-green text-white flex items-center justify-center font-bold">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary">{content.feature1Title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{content.feature1Desc}</p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-custom shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl accent-gold text-white flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary">{content.feature2Title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{content.feature2Desc}</p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-custom shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 dark:bg-slate-700 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary">{content.feature3Title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{content.feature3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-primary border-t border-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary">{content.pricingTitle}</h2>
            <p className="text-base text-secondary">{content.pricingSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Plan 1 */}
            <div className="bg-card p-8 rounded-2xl border border-custom shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-primary">{content.plan1Name}</h3>
                <div className="text-3xl font-extrabold text-primary">{content.plan1Price}</div>
                <p className="text-sm text-secondary">{content.plan1Desc}</p>
                <ul className="space-y-2.5 pt-4 text-xs text-secondary">
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" /> Single Campus Setup</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" /> English & French UI</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" /> 50 Student Registry Limit</li>
                </ul>
              </div>
              <button
                onClick={() => setViewMode('dashboard')}
                className="mt-8 w-full py-3 rounded-xl border border-custom bg-secondary text-primary font-semibold text-sm hover:bg-card transition-colors cursor-pointer"
              >
                {language === 'fr' ? 'Commencer' : language === 'ha' ? 'Fara' : 'Get Started'}
              </button>
            </div>

            {/* Plan 2 (Highlighted) */}
            <div className="bg-card p-8 rounded-2xl border-2 border-emerald-600 shadow-xl relative flex flex-col justify-between">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 accent-green text-white text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-primary">{content.plan2Name}</h3>
                <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{content.plan2Price}</div>
                <p className="text-sm text-secondary">{content.plan2Desc}</p>
                <ul className="space-y-2.5 pt-4 text-xs text-secondary">
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" /> Unlimited Student Registry</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" /> Full Subject & Competence Editor</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" /> Custom Appreciation Rules (0-100%)</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" /> Multi-Role Access Control</li>
                </ul>
              </div>
              <button
                onClick={() => setViewMode('dashboard')}
                className="mt-8 w-full py-3 rounded-xl accent-green text-white font-bold text-sm shadow-md hover:opacity-95 transition-all cursor-pointer"
              >
                {language === 'fr' ? 'Choisir Standard' : language === 'ha' ? 'Zaɓi Wannan' : 'Select Standard'}
              </button>
            </div>

            {/* Plan 3 */}
            <div className="bg-card p-8 rounded-2xl border border-custom shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-primary">{content.plan3Name}</h3>
                <div className="text-3xl font-extrabold text-primary">{content.plan3Price}</div>
                <p className="text-sm text-secondary">{content.plan3Desc}</p>
                <ul className="space-y-2.5 pt-4 text-xs text-secondary">
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" /> Multi-Campus School Networks</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" /> Dedicated Database Instance</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" /> Ministerial PDF Report Templates</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" /> 24/7 Priority Support</li>
                </ul>
              </div>
              <button
                onClick={() => setViewMode('dashboard')}
                className="mt-8 w-full py-3 rounded-xl border border-custom bg-secondary text-primary font-semibold text-sm hover:bg-card transition-colors cursor-pointer"
              >
                {language === 'fr' ? 'Contactez-nous' : language === 'ha' ? 'Tuntuɓe Mu' : 'Contact Sales'}
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
