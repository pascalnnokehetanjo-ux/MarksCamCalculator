export type UserRole = 'super_admin' | 'school_admin' | 'teacher' | 'viewer';
export type LanguageCode = 'en' | 'fr' | 'ha';

export interface School {
  id: string;
  name_en: string;
  name_fr: string;
  logo_url?: string;
  address_en: string;
  address_fr: string;
  phone: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  auth_user_id: string;
  school_id: string;
  full_name: string;
  role: UserRole;
  phone: string;
  language_preference: LanguageCode;
  created_at: string;
  updated_at: string;
}

export interface AcademicYear {
  id: string;
  school_id: string;
  name_en: string;
  name_fr: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Term {
  id: string;
  academic_year_id: string;
  name_en: string;
  name_fr: string;
  start_date: string;
  end_date: string;
  order_index: number;
}

export interface Month {
  id: string;
  term_id: string;
  name_en: string;
  name_fr: string;
  start_date: string;
  end_date: string;
  order_index: number;
}

export interface SchoolClass {
  id: string;
  school_id: string;
  academic_year_id: string;
  name_en: string;
  name_fr: string;
  level: string; // e.g. Form 1, 6ème, Primary 5, etc.
  section: string; // e.g. Bilingual, Anglophone, Francophone
  capacity: number;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  school_id: string;
  class_id: string;
  admission_number: string;
  first_name: string;
  last_name: string;
  other_names?: string;
  gender: 'M' | 'F';
  date_of_birth: string;
  photo_url?: string;
  guardian_name: string;
  guardian_phone: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Competence {
  id: string;
  school_id: string;
  code: string;
  name_en: string;
  name_fr: string;
  description_en: string;
  description_fr: string;
  order_index: number;
  is_active: boolean;
}

export interface Subject {
  id: string;
  school_id: string;
  code: string;
  name_en: string;
  name_fr: string;
  short_name_en: string;
  short_name_fr: string;
  order_index: number;
  is_active: boolean;
  has_sub_subjects: boolean;
}

export interface SubSubject {
  id: string;
  subject_id: string;
  school_id: string;
  code: string;
  name_en: string;
  name_fr: string;
  short_name_en: string;
  short_name_fr: string;
  order_index: number;
  is_active: boolean;
}

export interface EvaluationType {
  id: string;
  school_id: string;
  code: string; // oral, written, practical, attitude
  name_en: string;
  name_fr: string;
  is_mandatory: boolean;
  order_index: number;
  is_active: boolean;
}

export interface ClassSubjectConfiguration {
  id: string;
  school_id: string;
  class_id: string;
  subject_id: string;
  max_mark: number;
  is_active: boolean;
  order_index: number;
}

export interface ClassSubjectEvaluationConfiguration {
  id: string;
  class_subject_configuration_id: string;
  evaluation_type_id: string;
  max_mark: number;
  is_enabled: boolean;
  is_required: boolean;
}

export interface AppreciationRule {
  id: string;
  school_id: string;
  min_percentage: number;
  max_percentage: number;
  appreciation_en: string;
  appreciation_fr: string;
  grade: string;
  order_index: number;
  is_active: boolean;
}
