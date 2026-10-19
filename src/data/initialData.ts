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
  Subject,
  SubSubject,
  EvaluationType,
  AppreciationRule,
  ClassSubjectConfiguration,
  ClassSubjectEvaluationConfiguration,
  ClassCompetenceItemConfiguration
} from '../types/markscam';

export const initialSchool: School = {
  id: 'school-gbhs-yaounde',
  name_en: 'Government Bilingual High School Yaoundé',
  name_fr: 'Lycée Bilingue d\'État de Yaoundé',
  logo_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=150&auto=format&fit=crop&q=80',
  address_en: 'Mfandena, P.O. Box 1200 Yaoundé, Cameroon',
  address_fr: 'Mfandena, B.P. 1200 Yaoundé, Cameroun',
  phone: '+237 222 23 45 67',
  email: 'contact@gbhsyaounde.cm',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const initialUser: UserProfile = {
  id: 'user-admin-1',
  auth_user_id: 'auth-uuid-admin-001',
  school_id: 'school-gbhs-yaounde',
  full_name: 'Dr. Jean-Paul Mvondo',
  role: 'school_admin',
  phone: '+237 677 88 99 00',
  language_preference: 'en',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const initialAcademicYear: AcademicYear = {
  id: 'ay-2025-2026',
  school_id: 'school-gbhs-yaounde',
  name_en: '2025/2026 Academic Year',
  name_fr: 'Année Scolaire 2025/2026',
  start_date: '2025-09-08',
  end_date: '2026-07-03',
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const initialTerms: Term[] = [
  {
    id: 'term-1',
    academic_year_id: 'ay-2025-2026',
    name_en: 'First Term (Trimestre 1)',
    name_fr: 'Premier Trimestre',
    start_date: '2025-09-08',
    end_date: '2025-12-19',
    order_index: 1,
  },
  {
    id: 'term-2',
    academic_year_id: 'ay-2025-2026',
    name_en: 'Second Term (Trimestre 2)',
    name_fr: 'Deuxième Trimestre',
    start_date: '2026-01-05',
    end_date: '2026-03-27',
    order_index: 2,
  },
  {
    id: 'term-3',
    academic_year_id: 'ay-2025-2026',
    name_en: 'Third Term (Trimestre 3)',
    name_fr: 'Troisième Trimestre',
    start_date: '2026-04-13',
    end_date: '2026-07-03',
    order_index: 3,
  },
];

export const initialMonths: Month[] = [
  { id: 'm-sep', term_id: 'term-1', name_en: 'September 2025', name_fr: 'Septembre 2025', start_date: '2025-09-08', end_date: '2025-09-30', order_index: 1 },
  { id: 'm-oct', term_id: 'term-1', name_en: 'October 2025', name_fr: 'Octobre 2025', start_date: '2025-10-01', end_date: '2025-10-31', order_index: 2 },
  { id: 'm-nov', term_id: 'term-1', name_en: 'November 2025', name_fr: 'Novembre 2025', start_date: '2025-11-01', end_date: '2025-11-30', order_index: 3 },
  { id: 'm-dec', term_id: 'term-1', name_en: 'December 2025', name_fr: 'Décembre 2025', start_date: '2025-12-01', end_date: '2025-12-19', order_index: 4 },
  
  { id: 'm-jan', term_id: 'term-2', name_en: 'January 2026', name_fr: 'Janvier 2026', start_date: '2026-01-05', end_date: '2026-01-31', order_index: 5 },
  { id: 'm-feb', term_id: 'term-2', name_en: 'February 2026', name_fr: 'Février 2026', start_date: '2026-02-01', end_date: '2026-02-28', order_index: 6 },
  { id: 'm-mar', term_id: 'term-2', name_en: 'March 2026', name_fr: 'Mars 2026', start_date: '2026-03-01', end_date: '2026-03-27', order_index: 7 },

  { id: 'm-apr', term_id: 'term-3', name_en: 'April 2026', name_fr: 'Avril 2026', start_date: '2026-04-13', end_date: '2026-04-30', order_index: 8 },
  { id: 'm-may', term_id: 'term-3', name_en: 'May 2026', name_fr: 'Mai 2026', start_date: '2026-05-01', end_date: '2026-05-31', order_index: 9 },
  { id: 'm-jun', term_id: 'term-3', name_en: 'June 2026', name_fr: 'Juin 2026', start_date: '2026-06-01', end_date: '2026-06-30', order_index: 10 },
];

export const initialClasses: SchoolClass[] = [
  {
    id: 'class-form1-bil',
    school_id: 'school-gbhs-yaounde',
    academic_year_id: 'ay-2025-2026',
    name_en: 'Form 1 Bilingual A',
    name_fr: '6ème Bilingue A',
    level: 'Form 1 / 6ème',
    section: 'Bilingual / Bilingue',
    capacity: 55,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export const initialStudents: Student[] = [
  {
    id: 'std-001',
    school_id: 'school-gbhs-yaounde',
    class_id: 'class-form1-bil',
    admission_number: 'GBHSY/25/001',
    first_name: 'Amina',
    last_name: 'Njoya',
    other_names: 'Chantal',
    gender: 'F',
    date_of_birth: '2014-05-12',
    photo_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    guardian_name: 'Ibrahim Njoya',
    guardian_phone: '+237 699 11 22 33',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'std-002',
    school_id: 'school-gbhs-yaounde',
    class_id: 'class-form1-bil',
    admission_number: 'GBHSY/25/002',
    first_name: 'Emmanuel',
    last_name: 'Tabi',
    other_names: 'Junior',
    gender: 'M',
    date_of_birth: '2013-11-20',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    guardian_name: 'Grace Tabi',
    guardian_phone: '+237 675 44 55 66',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const initialCompetences: Competence[] = [
  {
    id: 'comp-1',
    school_id: 'school-gbhs-yaounde',
    code: 'C1',
    name_en: 'Communicate in English, French and one National language',
    name_fr: 'Communiquer en anglais, en français et dans une langue nationale',
    description_en: 'Mastery of official and national languages for effective expression.',
    description_fr: 'Maîtrise des langues officielles et nationales pour une expression efficace.',
    order_index: 1,
    is_active: true,
  },
  {
    id: 'comp-2',
    school_id: 'school-gbhs-yaounde',
    code: 'C2',
    name_en: 'Use Basic notions in Mathematics, Science and Technology',
    name_fr: 'Utiliser les notions de base en mathématiques, sciences et technologie',
    description_en: 'Application of mathematical reasoning and scientific principles.',
    description_fr: 'Application du raisonnement mathématique et des principes scientifiques.',
    order_index: 2,
    is_active: true,
  },
  {
    id: 'comp-3',
    school_id: 'school-gbhs-yaounde',
    code: 'C3',
    name_en: 'Practice Social and Citizenship Values',
    name_fr: 'Pratiquer les valeurs sociales et citoyennes',
    description_en: 'Adherence to moral, civic, and community living standards.',
    description_fr: 'Adhésion aux normes de vie morale, civique et communautaire.',
    order_index: 3,
    is_active: true,
  },
  {
    id: 'comp-4',
    school_id: 'school-gbhs-yaounde',
    code: 'C4',
    name_en: 'Demonstrate autonomy, spirit of initiative, creativity and Entrepreneurship Values',
    name_fr: 'Démontrer l\'autonomie, l\'esprit d\'initiative, la créativité et les valeurs d\'entrepreneuriat',
    description_en: 'Developing self-reliance and vocational enterprise.',
    description_fr: 'Développement de l\'autonomie et de l\'esprit d\'entreprise.',
    order_index: 4,
    is_active: true,
  },
  {
    id: 'comp-5',
    school_id: 'school-gbhs-yaounde',
    code: 'C5',
    name_en: 'Use Basic concepts and tools in Information and Communication Technologies',
    name_fr: 'Utiliser les concepts et outils de base des technologies de l\'information et de la communication',
    description_en: 'Digital literacy and ICT tool utilization.',
    description_fr: 'Alphabétisation numérique et utilisation des outils TIC.',
    order_index: 5,
    is_active: true,
  },
  {
    id: 'comp-6',
    school_id: 'school-gbhs-yaounde',
    code: 'C6',
    name_en: 'Practice Physical, Sports, and Artistic activities',
    name_fr: 'Pratiquer des activités physiques, sportives et artistiques',
    description_en: 'Physical fitness and artistic expression.',
    description_fr: 'Condition physique et expression artistique.',
    order_index: 6,
    is_active: true,
  },
];

export const initialCompetenceItems: CompetenceItem[] = [
  // C1
  { id: 'ci-1a', competence_id: 'comp-1', school_id: 'school-gbhs-yaounde', code: 'C1A', name_en: 'Communicate in English', name_fr: 'Communiquer en anglais', description_en: 'English language proficiency', description_fr: 'Maîtrise de la langue anglaise', order_index: 1, is_active: true },
  { id: 'ci-1b', competence_id: 'comp-1', school_id: 'school-gbhs-yaounde', code: 'C1B', name_en: 'Communicate in French', name_fr: 'Communiquer en français', description_en: 'French language proficiency', description_fr: 'Maîtrise de la langue française', order_index: 2, is_active: true },
  { id: 'ci-1c', competence_id: 'comp-1', school_id: 'school-gbhs-yaounde', code: 'C1C', name_en: 'Communicate in one National language', name_fr: 'Communiquer dans une langue nationale', description_en: 'Local language proficiency', description_fr: 'Maîtrise d\'une langue nationale', order_index: 3, is_active: true },
  
  // C2
  { id: 'ci-2a', competence_id: 'comp-2', school_id: 'school-gbhs-yaounde', code: 'C2A', name_en: 'Use Basic notions in Mathematics', name_fr: 'Utiliser les notions de base en mathématiques', description_en: 'Mathematical reasoning', description_fr: 'Raisonnement mathématique', order_index: 1, is_active: true },
  { id: 'ci-2b', competence_id: 'comp-2', school_id: 'school-gbhs-yaounde', code: 'C2B', name_en: 'Use Basic notions in Science and Technology', name_fr: 'Utiliser les notions de base en sciences et technologie', description_en: 'Scientific inquiry and technology', description_fr: 'Démarche scientifique et technologie', order_index: 2, is_active: true },

  // C3
  { id: 'ci-3a', competence_id: 'comp-3', school_id: 'school-gbhs-yaounde', code: 'C3A', name_en: 'Practice Social Values', name_fr: 'Pratiquer les valeurs sociales', description_en: 'Social integration values', description_fr: 'Valeurs d\'intégration sociale', order_index: 1, is_active: true },
  { id: 'ci-3b', competence_id: 'comp-3', school_id: 'school-gbhs-yaounde', code: 'C3B', name_en: 'Practice Citizenship Values', name_fr: 'Pratiquer les valeurs citoyennes', description_en: 'Civic responsibilities', description_fr: 'Devoirs civiques', order_index: 2, is_active: true },

  // C4
  { id: 'ci-4a', competence_id: 'comp-4', school_id: 'school-gbhs-yaounde', code: 'C4A', name_en: 'Demonstrate autonomy, spirit of initiative, creativity and Entrepreneurship in Vocational Studies', name_fr: 'Démontrer l\'autonomie, l\'esprit d\'initiative, la créativité et l\'entrepreneuriat dans les études professionnelles', description_en: 'Vocational practical skills', description_fr: 'Compétences pratiques professionnelles', order_index: 1, is_active: true },
  { id: 'ci-4b', competence_id: 'comp-4', school_id: 'school-gbhs-yaounde', code: 'C4B', name_en: 'Demonstrate autonomy, spirit of initiative, creativity and Entrepreneurship', name_fr: 'Démontrer l\'autonomie, l\'esprit d\'initiative, la créativité et l\'entrepreneuriat', description_en: 'Enterprise and initiative', description_fr: 'Esprit d\'entreprise', order_index: 2, is_active: true },

  // C5
  { id: 'ci-5', competence_id: 'comp-5', school_id: 'school-gbhs-yaounde', code: 'C5', name_en: 'Information and Communication Technology', name_fr: 'Technologies de l\'Information et de la Communication', description_en: 'ICT computer literacy', description_fr: 'Maîtrise informatique', order_index: 1, is_active: true },

  // C6
  { id: 'ci-6a1', competence_id: 'comp-6', school_id: 'school-gbhs-yaounde', code: 'C6A1', name_en: 'Practice Physical and Sports activities (Physically non-challenged)', name_fr: 'Pratiquer des activités physiques et sportives (valides)', description_en: 'Sports for non-challenged learners', description_fr: 'Sports pour élèves valides', order_index: 1, is_active: true },
  { id: 'ci-6a2', competence_id: 'comp-6', school_id: 'school-gbhs-yaounde', code: 'C6A2', name_en: 'Practice Physical and Sports activities (Physically challenged)', name_fr: 'Pratiquer des activités physiques et sportives (handicapés physiques)', description_en: 'Adapted sports for challenged learners', description_fr: 'Sports adaptés pour élèves handicapés', order_index: 2, is_active: true },
  { id: 'ci-6b', competence_id: 'comp-6', school_id: 'school-gbhs-yaounde', code: 'C6B', name_en: 'Practice Artistic activities', name_fr: 'Pratiquer des activités artistiques', description_en: 'Arts and crafts', description_fr: 'Arts plastiques et musicaux', order_index: 3, is_active: true },
];

export const initialClassCompetenceConfigs: ClassCompetenceItemConfiguration[] = initialCompetenceItems.map((ci, idx) => ({
  id: `ccic-${idx}`,
  school_id: 'school-gbhs-yaounde',
  class_id: 'class-form1-bil',
  competence_item_id: ci.id,
  is_active: true,
  order_index: idx + 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

export const initialSubjects: Subject[] = [
  { id: 'subj-eng', school_id: 'school-gbhs-yaounde', competence_item_id: 'ci-1a', code: 'ENG', name_en: 'English Language', name_fr: 'Langue Anglaise', short_name_en: 'Eng', short_name_fr: 'Angl', order_index: 1, is_active: true, has_sub_subjects: false },
  { id: 'subj-fre', school_id: 'school-gbhs-yaounde', competence_item_id: 'ci-1b', code: 'FRE', name_en: 'French Language', name_fr: 'Langue Française', short_name_en: 'Fre', short_name_fr: 'Franç', order_index: 2, is_active: true, has_sub_subjects: false },
  { id: 'subj-nat', school_id: 'school-gbhs-yaounde', competence_item_id: 'ci-1c', code: 'NAT', name_en: 'National Language', name_fr: 'Langue Nationale', short_name_en: 'Nat', short_name_fr: 'Nat', order_index: 3, is_active: true, has_sub_subjects: false },
  { id: 'subj-math', school_id: 'school-gbhs-yaounde', competence_item_id: 'ci-2a', code: 'MATH', name_en: 'Mathematics', name_fr: 'Mathématiques', short_name_en: 'Math', short_name_fr: 'Math', order_index: 4, is_active: true, has_sub_subjects: false },
  { id: 'subj-sci', school_id: 'school-gbhs-yaounde', competence_item_id: 'ci-2b', code: 'SCI', name_en: 'General Science & Technology', name_fr: 'Sciences et Technologies', short_name_en: 'Science', short_name_fr: 'Sci', order_index: 5, is_active: true, has_sub_subjects: true },
  { id: 'subj-hist', school_id: 'school-gbhs-yaounde', competence_item_id: 'ci-3a', code: 'HIST', name_en: 'History & Geography', name_fr: 'Histoire et Géographie', short_name_en: 'Hist-Geo', short_name_fr: 'Hist-Géo', order_index: 6, is_active: true, has_sub_subjects: false },
  { id: 'subj-cit', school_id: 'school-gbhs-yaounde', competence_item_id: 'ci-3b', code: 'CIT', name_en: 'Citizenship & Moral Education', name_fr: 'Éducation Civique et Morale', short_name_en: 'Civics', short_name_fr: 'ECM', order_index: 7, is_active: true, has_sub_subjects: false },
  { id: 'subj-ict', school_id: 'school-gbhs-yaounde', competence_item_id: 'ci-5', code: 'ICT', name_en: 'Computer Studies (ICT)', name_fr: 'Informatique (TIC)', short_name_en: 'ICT', short_name_fr: 'Info', order_index: 8, is_active: true, has_sub_subjects: false },
  { id: 'subj-eps', school_id: 'school-gbhs-yaounde', competence_item_id: 'ci-6a1', code: 'EPS', name_en: 'Physical Education & Sports', name_fr: 'Éducation Physique et Sportive', short_name_en: 'PE', short_name_fr: 'EPS', order_index: 9, is_active: true, has_sub_subjects: false },
  { id: 'subj-arts', school_id: 'school-gbhs-yaounde', competence_item_id: 'ci-6b', code: 'ARTS', name_en: 'Arts & Craft', name_fr: 'Arts Plastiques', short_name_en: 'Arts', short_name_fr: 'Arts', order_index: 10, is_active: true, has_sub_subjects: false },
];

export const initialSubSubjects: SubSubject[] = [
  {
    id: 'sub-bio',
    subject_id: 'subj-sci',
    school_id: 'school-gbhs-yaounde',
    competence_item_id: 'ci-2b',
    code: 'SCI-BIO',
    name_en: 'Biology & Geology',
    name_fr: 'Biologie & Géologie',
    short_name_en: 'Bio',
    short_name_fr: 'Bio',
    order_index: 1,
    is_active: true,
  },
  {
    id: 'sub-phy',
    subject_id: 'subj-sci',
    school_id: 'school-gbhs-yaounde',
    competence_item_id: 'ci-2b',
    code: 'SCI-PHY',
    name_en: 'Physics & Chemistry',
    name_fr: 'Physique & Chimie',
    short_name_en: 'Phys',
    short_name_fr: 'Phys',
    order_index: 2,
    is_active: true,
  },
];

export const initialEvaluationTypes: EvaluationType[] = [
  { id: 'et-oral', school_id: 'school-gbhs-yaounde', code: 'oral', name_en: 'Oral / Orale', name_fr: 'Orale / Oral', is_mandatory: true, order_index: 1, is_active: true },
  { id: 'et-written', school_id: 'school-gbhs-yaounde', code: 'written', name_en: 'Written / Écrite', name_fr: 'Écrite / Written', is_mandatory: true, order_index: 2, is_active: true },
  { id: 'et-practical', school_id: 'school-gbhs-yaounde', code: 'practical', name_en: 'Practical / Pratique', name_fr: 'Pratique / Practical', is_mandatory: false, order_index: 3, is_active: true },
  { id: 'et-attitude', school_id: 'school-gbhs-yaounde', code: 'attitude', name_en: 'Attitude / Attitude', name_fr: 'Attitude / Attitude', is_mandatory: false, order_index: 4, is_active: true },
];

export const initialAppreciationRules: AppreciationRule[] = [
  {
    id: 'app-1',
    school_id: 'school-gbhs-yaounde',
    min_percentage: 0.0,
    max_percentage: 50.0,
    appreciation_en: 'Competences Not Acquired (CNA)',
    appreciation_fr: 'Compétences non acquises (CNA)',
    grade: 'C',
    order_index: 1,
    is_active: true,
  },
  {
    id: 'app-2',
    school_id: 'school-gbhs-yaounde',
    min_percentage: 50.1,
    max_percentage: 70.0,
    appreciation_en: 'Competences in the Process of Acquisition (CPA)',
    appreciation_fr: 'Compétences en cours d’acquisition (CPA)',
    grade: 'B',
    order_index: 2,
    is_active: true,
  },
  {
    id: 'app-3',
    school_id: 'school-gbhs-yaounde',
    min_percentage: 70.1,
    max_percentage: 85.0,
    appreciation_en: 'Competences Acquired (CA)',
    appreciation_fr: 'Compétences acquises (CA)',
    grade: 'A',
    order_index: 3,
    is_active: true,
  },
  {
    id: 'app-4',
    school_id: 'school-gbhs-yaounde',
    min_percentage: 85.1,
    max_percentage: 100.0,
    appreciation_en: 'Expert (Ept)',
    appreciation_fr: 'Expert (Ept)',
    grade: 'A+',
    order_index: 4,
    is_active: true,
  },
];
