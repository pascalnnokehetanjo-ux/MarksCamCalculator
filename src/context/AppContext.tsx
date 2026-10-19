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
  CompetenceItem,
  ClassCompetenceItemConfiguration,
  Subject,
  SubSubject,
  EvaluationType,
  AppreciationRule,
  LanguageCode,
  ClassSubjectEvaluationConfiguration
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
  initialCompetenceItems,
  initialClassCompetenceConfigs,
  initialSubjects,
  initialSubSubjects,
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
  competencesHier: { en: 'Competence Hierarchy', fr: 'Hiérarchie des Compétences', ha: 'Tsarin Kwarewa' },
  competenceItems: { en: 'Competence Items', fr: 'Éléments de Compétence', ha: 'Sassan Kwarewa' },
  subjectsSub: { en: 'Subjects & Sub-Subjects', fr: 'Matières & Sous-Matières', ha: 'Darussa & Karamin Darussa' },
  assessmentStructure: { en: 'Assessment Structure Preview', fr: 'Aperçu de la Structure d\'Évaluation', ha: 'Tsarin Jarrabawa' },
  maxMarksConfig: { en: 'Maximum Marks & Evaluations', fr: 'Notes Max & Évaluations', ha: 'Matsakaicin Maki' },
};

interface AppContextType {
  school: School;
  setSchool: React.Dispatch<React.SetStateAction<School>>;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  academicYears: AcademicYear[];
  terms: Term[];
  months: Month[];
  classes: SchoolClass[];
  setClasses: React.Dispatch<React.SetStateAction<SchoolClass[]>>;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  competences: Competence[];
  setCompetences: React.Dispatch<React.SetStateAction<Competence[]>>;
  competenceItems: CompetenceItem[];
  setCompetenceItems: React.Dispatch<React.SetStateAction<CompetenceItem[]>>;
  classCompetenceConfigs: ClassCompetenceItemConfiguration[];
  setClassCompetenceConfigs: React.Dispatch<React.SetStateAction<ClassCompetenceItemConfiguration[]>>;
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  subSubjects: SubSubject[];
  setSubSubjects: React.Dispatch<React.SetStateAction<SubSubject[]>>;
  evaluationTypes: EvaluationType[];
  setEvaluationTypes: React.Dispatch<React.SetStateAction<EvaluationType[]>>;
  appreciationRules: AppreciationRule[];
  setAppreciationRules: React.Dispatch<React.SetStateAction<AppreciationRule[]>>;
  evalConfigs: Record<string, { oral: number; written: number; practical: number; attitude: number }>;
  setEvalConfigs: React.Dispatch<React.SetStateAction<Record<string, { oral: number; written: number; practical: number; attitude: number }>>>;
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

  const [academicYears] = useState<AcademicYear[]>([initialAcademicYear]);
  const [terms] = useState<Term[]>(initialTerms);
  const [months] = useState<Month[]>(initialMonths);

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

  const [competenceItems, setCompetenceItems] = useState<CompetenceItem[]>(() => {
    const saved = localStorage.getItem('markscam_competence_items');
    return saved ? JSON.parse(saved) : initialCompetenceItems;
  });

  const [classCompetenceConfigs, setClassCompetenceConfigs] = useState<ClassCompetenceItemConfiguration[]>(() => {
    const saved = localStorage.getItem('markscam_class_competence_configs');
    return saved ? JSON.parse(saved) : initialClassCompetenceConfigs;
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('markscam_subjects');
    return saved ? JSON.parse(saved) : initialSubjects;
  });

  const [subSubjects, setSubSubjects] = useState<SubSubject[]>(() => {
    const saved = localStorage.getItem('markscam_sub_subjects');
    return saved ? JSON.parse(saved) : initialSubSubjects;
  });

  const [evaluationTypes, setEvaluationTypes] = useState<EvaluationType[]>(() => {
    const saved = localStorage.getItem('markscam_evaluation_types');
    return saved ? JSON.parse(saved) : initialEvaluationTypes;
  });

  const [appreciationRules, setAppreciationRules] = useState<AppreciationRule[]>(() => {
    const saved = localStorage.getItem('markscam_appreciation_rules');
    return saved ? JSON.parse(saved) : initialAppreciationRules;
  });

  // Evaluation max marks config per subject / sub-subject ID: default oral=5, written=10, practical=3, attitude=2 (total 20)
  const [evalConfigs, setEvalConfigs] = useState<Record<string, { oral: number; written: number; practical: number; attitude: number }>>(() => {
    const saved = localStorage.getItem('markscam_eval_configs');
    if (saved) return JSON.parse(saved);
    const defaults: Record<string, { oral: number; written: number; practical: number; attitude: number }> = {};
    initialSubjects.forEach(s => {
      defaults[s.id] = { oral: 5, written: 10, practical: 3, attitude: 2 };
    });
    initialSubSubjects.forEach(sub => {
      defaults[sub.id] = { oral: 5, written: 10, practical: 3, attitude: 2 };
    });
    return defaults;
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
  const [activeTab, setActiveTab] = useState<string>('hierarchy');

  // Persistence
  useEffect(() => { localStorage.setItem('markscam_school', JSON.stringify(school)); }, [school]);
  useEffect(() => { localStorage.setItem('markscam_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('markscam_classes', JSON.stringify(classes)); }, [classes]);
  useEffect(() => { localStorage.setItem('markscam_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('markscam_competences', JSON.stringify(competences)); }, [competences]);
  useEffect(() => { localStorage.setItem('markscam_competence_items', JSON.stringify(competenceItems)); }, [competenceItems]);
  useEffect(() => { localStorage.setItem('markscam_class_competence_configs', JSON.stringify(classCompetenceConfigs)); }, [classCompetenceConfigs]);
  useEffect(() => { localStorage.setItem('markscam_subjects', JSON.stringify(subjects)); }, [subjects]);
  useEffect(() => { localStorage.setItem('markscam_sub_subjects', JSON.stringify(subSubjects)); }, [subSubjects]);
  useEffect(() => { localStorage.setItem('markscam_evaluation_types', JSON.stringify(evaluationTypes)); }, [evaluationTypes]);
  useEffect(() => { localStorage.setItem('markscam_appreciation_rules', JSON.stringify(appreciationRules)); }, [appreciationRules]);
  useEffect(() => { localStorage.setItem('markscam_eval_configs', JSON.stringify(evalConfigs)); }, [evalConfigs]);
  useEffect => { localStorage.setItem('markscam_language', language); }, [language];

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    setUser(prev => ({ ...prev, language_preference: lang }));
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

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
        terms,
        months,
        classes,
        setClasses,
        students,
        setStudents,
        competences,
        setCompetences,
        competenceItems,
        setCompetenceItems,
        classCompetenceConfigs,
        setClassCompetenceConfigs,
        subjects,
        setSubjects,
        subSubjects,
        setSubSubjects,
        evaluationTypes,
        setEvaluationTypes,
        appreciationRules,
        setAppreciationRules,
        evalConfigs,
        setEvalConfigs,
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
