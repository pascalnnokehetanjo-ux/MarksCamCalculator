import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  School,
  UserProfile,
  AcademicYear,
  Term,
  Month,
  SchoolClass,
  Student,
  Competence,
  Subject,
  EvaluationType,
  AppreciationRule,
  LanguageCode,
  UserRole
} from '../types/markscam';
import {
  initialSchool,
  initialUser,
  initialAcademicYear,
  initialTerms,
  initialMonths,
  initialClasses,
  initialStudents,
  initialCompetences,
  initialSubjects,
  initialEvaluationTypes,
  initialAppreciationRules
} from '../data/initialData';

export interface Translations {
  [key: string]: {
    en: string;
    fr: string;
    ha: string;
  };
}

export const translations: Translations = {
  appName: { en: 'MarksCam', fr: 'MarksCam', ha: 'MarksCam' },
  tagline: {
    en: 'Bilingual Cameroonian School Assessment & Competency SaaS',
    fr: 'SaaS Bilingue d\'Évaluation et de Suivi des Compétences Scolaires au Cameroun',
    ha: 'Tsarin Tantance Makarantu na Kasar Kamaru da Harsuna Biyu',
  },
  enterDashboard: { en: 'Open SaaS Dashboard', fr: 'Ouvrir le Tableau de Bord', ha: 'Buɗe Shaafin Kula da Makaranta' },
  landingTitle: {
    en: 'The Premier Bilingual Assessment & Grading SaaS for Cameroon',
    fr: 'La Plateforme SaaS d\'Évaluation Scolaire Bilingue de Référence au Cameroun',
    ha: 'Babban Tsarin Tantance Makarantu da Alamomi don Ƙasar Kamaru',
  },
  landingDesc: {
    en: 'Designed specifically for Cameroonian primary and secondary schools operating under both Anglophone (GCE) and Francophone (Baccalauréat/Probatoire) sub-systems with native English and French curriculum support.',
    fr: 'Conçu spécifiquement pour les écoles primaires et secondaires du Cameroun fonctionnant sous les sous-systèmes anglophone et francophone avec un bilinguisme intégral.',
    ha: 'An tsara shi musamman don makarantun Kamaru masu koyar da Turanci da Faransanci.',
  },
  schoolProfile: { en: 'School Profile', fr: 'Profil de l\'Établissement', ha: 'Bayanin Makaranta' },
  academicYears: { en: 'Academic Years', fr: 'Années Scolaires', ha: 'Shekarun Karatu' },
  termsMonths: { en: 'Terms & Months', fr: 'Trimestres & Mois', ha: 'Lokutan Karatu & Watanni' },
  classes: { en: 'Classes & Sections', fr: 'Classes & Sections', ha: 'Ajujuwa & Sassan' },
  students: { en: 'Student Registry', fr: 'Registre des Élèves', ha: 'Rijistar Dalibai' },
  competences: { en: 'Competences (6)', fr: 'Compétences (6)', ha: 'Kwarewa (6)' },
  subjects: { en: 'Subjects & Sub-Subjects', fr: 'Matières & Sous-Matières', ha: 'Darussa & Karamin Darussa' },
  evaluationTypes: { en: 'Evaluation Types', fr: 'Types d\'Évaluation', ha: 'Nau\'in Jarrabawa' },
  appreciationRules: { en: 'Appreciation Rules', fr: 'Grille d\'Appréciation', ha: 'Dokokin Daraja' },
  sqlDatabase: { en: 'Supabase SQL & Schema', fr: 'Schéma SQL Supabase', ha: 'Tsarin SQL da Bayanai' },
  unitTests: { en: 'Validation & Tests', fr: 'Tests & Validations', ha: 'Gwaje-gwajen Tsari' },
  language: { en: 'Language', fr: 'Langue', ha: 'Harshe' },
  theme: { en: 'Theme', fr: 'Thème', ha: 'Jigo' },
  saveChanges: { en: 'Save Changes', fr: 'Enregistrer', ha: 'Ajiye Canje-canje' },
  cancel: { en: 'Cancel', fr: 'Annuler', ha: 'Soke' },
  add: { en: 'Add New', fr: 'Ajouter', ha: 'Ƙara Sabo' },
  edit: { en: 'Edit', fr: 'Modifier', ha: 'Gyara' },
  delete: { en: 'Delete', fr: 'Supprimer', ha: 'Goge' },
  active: { en: 'Active', fr: 'Actif', ha: 'Mai Aiki' },
  inactive: { en: 'Inactive', fr: 'Inactif', ha: 'Ba Mai Aiki Ba' },
  englishLabel: { en: 'English Value', fr: 'Valeur en Anglais', ha: 'Darajar Turanci' },
  frenchLabel: { en: 'French Value', fr: 'Valeur en Français', ha: 'Darajar Faransanci' },
  searchPlaceholder: { en: 'Search records...', fr: 'Rechercher...', ha: 'Bincika...' },
  featuresTitle: {
    en: 'Built for Cameroonian Education Standards',
    fr: 'Conforme aux Normes du Système Éducatif Camerounais',
    ha: 'An Gina Shi Don Ka\'idojin Ilimi na Kamaru',
  },
  pricingTitle: {
    en: 'Transparent School Subscription Plans',
    fr: 'Tarifs Transparents pour Établissements',
    ha: 'Tsarin Farashi mai Sauƙi ga Makarantu',
  },
};

interface AppContextType {
  school: School;
  setSchool: React.Dispatch<React.SetStateAction<School>>;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  academicYears: AcademicYear[];
  setAcademicYears: React.Dispatch<React.SetStateAction<AcademicYear[]>>;
  terms: Term[];
  setTerms: React.Dispatch<React.SetStateAction<Term[]>>;
  months: Month[];
  setMonths: React.Dispatch<React.SetStateAction<Month[]>>;
  classes: SchoolClass[];
  setClasses: React.Dispatch<React.SetStateAction<SchoolClass[]>>;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  competences: Competence[];
  setCompetences: React.Dispatch<React.SetStateAction<Competence[]>>;
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  evaluationTypes: EvaluationType[];
  setEvaluationTypes: React.Dispatch<React.SetStateAction<EvaluationType[]>>;
  appreciationRules: AppreciationRule[];
  setAppreciationRules: React.Dispatch<React.SetStateAction<AppreciationRule[]>>;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  viewMode: 'landing' | 'dashboard';
  setViewMode: (mode: 'landing' | 'dashboard') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [school, setSchool] = useState<School>(() => {
    const saved = localStorage.getItem('markscam_school');
    return saved ? JSON.parse(saved) : initialSchool;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('markscam_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [academicYears, setAcademicYears] = useState<AcademicYear[]>(() => {
    const saved = localStorage.getItem('markscam_academic_years');
    return saved ? JSON.parse(saved) : [initialAcademicYear];
  });

  const [terms, setTerms] = useState<Term[]>(() => {
    const saved = localStorage.getItem('markscam_terms');
    return saved ? JSON.parse(saved) : initialTerms;
  });

  const [months, setMonths] = useState<Month[]>(() => {
    const saved = localStorage.getItem('markscam_months');
    return saved ? JSON.parse(saved) : initialMonths;
  });

  const [classes, setClasses] = useState<SchoolClass[]>(() => {
    const saved = localStorage.getItem('markscam_classes');
    return saved ? JSON.parse(saved) : initialClasses;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('markscam_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [competences, setCompetences] = useState<Competence[]>(() => {
    const saved = localStorage.getItem('markscam_competences');
    return saved ? JSON.parse(saved) : initialCompetences;
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('markscam_subjects');
    return saved ? JSON.parse(saved) : initialSubjects;
  });

  const [evaluationTypes, setEvaluationTypes] = useState<EvaluationType[]>(() => {
    const saved = localStorage.getItem('markscam_evaluation_types');
    return saved ? JSON.parse(saved) : initialEvaluationTypes;
  });

  const [appreciationRules, setAppreciationRules] = useState<AppreciationRule[]>(() => {
    const saved = localStorage.getItem('markscam_appreciation_rules');
    return saved ? JSON.parse(saved) : initialAppreciationRules;
  });

  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('markscam_language');
    return (saved as LanguageCode) || 'en';
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('markscam_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState<string>('profile');

  // Persistence effects
  useEffect(() => { localStorage.setItem('markscam_school', JSON.stringify(school)); }, [school]);
  useEffect(() => { localStorage.setItem('markscam_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('markscam_academic_years', JSON.stringify(academicYears)); }, [academicYears]);
  useEffect(() => { localStorage.setItem('markscam_terms', JSON.stringify(terms)); }, [terms]);
  useEffect(() => { localStorage.setItem('markscam_months', JSON.stringify(months)); }, [months]);
  useEffect(() => { localStorage.setItem('markscam_classes', JSON.stringify(classes)); }, [classes]);
  useEffect(() => { localStorage.setItem('markscam_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('markscam_competences', JSON.stringify(competences)); }, [competences]);
  useEffect(() => { localStorage.setItem('markscam_subjects', JSON.stringify(subjects)); }, [subjects]);
  useEffect(() => { localStorage.setItem('markscam_evaluation_types', JSON.stringify(evaluationTypes)); }, [evaluationTypes]);
  useEffect(() => { localStorage.setItem('markscam_appreciation_rules', JSON.stringify(appreciationRules)); }, [appreciationRules]);
  useEffect(() => {
    localStorage.setItem('markscam_language', language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem('markscam_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    setUser(prev => ({ ...prev, language_preference: lang }));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language] || translations[key]['en'];
    }
    return key;
  };

  return (
    <AppContext.Provider
      value={{
        school,
        setSchool,
        user,
        setUser,
        academicYears,
        setAcademicYears,
        terms,
        setTerms,
        months,
        setMonths,
        classes,
        setClasses,
        students,
        setStudents,
        competences,
        setCompetences,
        subjects,
        setSubjects,
        evaluationTypes,
        setEvaluationTypes,
        appreciationRules,
        setAppreciationRules,
        language,
        setLanguage,
        theme,
        toggleTheme,
        viewMode,
        setViewMode,
        activeTab,
        setActiveTab,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
