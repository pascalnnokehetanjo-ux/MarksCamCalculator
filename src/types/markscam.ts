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
  level: string;
  section: string;
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
  code: string; // C1 to C6
  name_en: string;
  name_fr: string;
  description_en: string;
  description_fr: string;
  order_index: number;
  is_active: boolean;
}

export interface CompetenceItem {
  id: string;
  competence_id: string;
  school_id: string;
  code: string; // C1A, C1B, C1C, C2A, C2B, C3A, C3B, C4A, C4B, C5, C6A1, C6A2, C6B
  name_en: string;
  name_fr: string;
  description_en: string;
  description_fr: string;
  order_index: number;
  is_active: boolean;
}

export interface ClassCompetenceItemConfiguration {
  id: string;
  school_id: string;
  class_id: string;
  competence_item_id: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  school_id: string;
  competence_item_id: string;
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
  competence_item_id: string;
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
  max_mark: number; // monthly total max mark (derived or configured)
  is_active: boolean;
  order_index: number;
}

export interface ClassSubjectEvaluationConfiguration {
  id: string;
  class_subject_configuration_id: string;
  evaluation_type_id: string;
  max_mark: number; // e.g., oral=5, written=10, practical=3, attitude=2
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
export type MarkStatus = 'draft' | 'verified' | 'locked';
export type MarkSource = 'manual' | 'ocr';

export interface StudentMark {
  id: string;
  school_id: string;
  class_id: string;
  student_id: string;
  academic_year_id: string;
  term_id: string;
  month_id: string;
  competence_item_id: string;
  subject_id?: string;
  sub_subject_id?: string;
  evaluation_type_id: string;
  score: number;
  max_mark: number;
  entered_by: string;
  verified_by?: string;
  verified_at?: string;
  status: MarkStatus;
  source: MarkSource;
  created_at: string;
  updated_at: string;
}

export interface MonthlyResult {
  id: string;
  school_id: string;
  academic_year_id: string;
  term_id: string;
  month_id: string;
  class_id: string;
  student_id: string;
  competence_id?: string;
  competence_item_id?: string;
  subject_id?: string;
  sub_subject_id?: string;
  score: number;
  max_mark: number;
  percentage: number;
  appreciation_en: string;
  appreciation_fr: string;
  grade: string;
  average_out_of_20?: number;
  class_rank?: number;
  class_size?: number;
  calculated_at: string;
}

export interface TermlyResult {
  id: string;
  school_id: string;
  academic_year_id: string;
  term_id: string;
  class_id: string;
  student_id: string;
  subject_id?: string;
  sub_subject_id?: string;
  term_score: number;
  term_max_mark: number;
  term_percentage: number;
  appreciation_en: string;
  appreciation_fr: string;
  grade: string;
  term_average_out_of_20?: number;
  calculated_at: string;
}

export interface AnnualResult {
  id: string;
  school_id: string;
  academic_year_id: string;
  class_id: string;
  student_id: string;
  term1_average: number;
  term2_average: number;
  term3_average: number;
  annual_average_out_of_20: number;
  appreciation_en: string;
  appreciation_fr: string;
  grade: string;
  class_rank?: number;
  class_size?: number;
  calculated_at: string;
}
export type PhotoStatus = 'uploaded' | 'processing' | 'extracted' | 'needs_review' | 'verified' | 'rejected' | 'failed';
export type MatchStatus = 'matched' | 'unmatched' | 'ambiguous' | 'low_confidence';
export type VerificationSessionStatus = 'in_progress' | 'submitted' | 'approved' | 'rejected';

export interface MarksheetPhoto {
  id: string;
  school_id: string;
  academic_year_id: string;
  term_id: string;
  month_id: string;
  class_id: string;
  subject_id?: string;
  sub_subject_id?: string;
  competence_item_id?: string;
  evaluation_type_id?: string;
  uploaded_by: string;
  original_file_path: string;
  processed_file_path?: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  page_number: number;
  total_pages: number;
  status: PhotoStatus;
  ocr_provider: string;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface OcrExtraction {
  id: string;
  marksheet_photo_id: string;
  school_id: string;
  row_index: number;
  column_index: number;
  raw_text: string;
  normalized_text: string;
  cell_type: 'student_name' | 'admission_number' | 'subject' | 'evaluation_type' | 'max_mark' | 'score' | 'unknown';
  confidence: number;
  matched_student_id?: string;
  matched_subject_id?: string;
  matched_evaluation_type_id?: string;
  match_status: MatchStatus;
  created_at: string;
  updated_at: string;
}

export interface OcrVerificationSession {
  id: string;
  marksheet_photo_id: string;
  school_id: string;
  started_by: string;
  submitted_by?: string;
  approved_by?: string;
  status: VerificationSessionStatus;
  correction_count: number;
  started_at: string;
  submitted_at?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface OcrTransferLog {
  id: string;
  school_id: string;
  marksheet_photo_id: string;
  verification_session_id: string;
  class_id: string;
  month_id: string;
  marks_created: number;
  marks_updated: number;
  duplicates_prevented: number;
  invalid_cells_rejected: number;
  students_affected: number;
  transferred_by: string;
  transferred_at: string;
  created_at: string;
}
export type RecommendationType =
  | 'low_performance'
  | 'declining_performance'
  | 'improving_performance'
  | 'strong_performance'
  | 'inconsistent_performance'
  | 'subject_specific_weakness'
  | 'competence_specific_weakness'
  | 'missing_mandatory_marks'
  | 'missing_optional_evaluation'
  | 'incomplete_monthly_result'
  | 'incomplete_term_result'
  | 'class_wide_decline'
  | 'class_wide_improvement'
  | 'assessment_gap'
  | 'custom_teacher_recommendation';

export type RecommendationSeverity = 'info' | 'warning' | 'critical';
export type RecommendationStatus = 'open' | 'accepted' | 'edited' | 'dismissed' | 'converted_to_action';

export interface Recommendation {
  id: string;
  school_id: string;
  academic_year_id: string;
  term_id?: string;
  month_id?: string;
  class_id: string;
  student_id?: string;
  subject_id?: string;
  competence_id?: string;
  recommendation_type: RecommendationType;
  severity: RecommendationSeverity;
  title_en: string;
  title_fr: string;
  evidence_json: string;
  trigger_rule: string;
  recommendation_en: string;
  recommendation_fr: string;
  ai_generated: boolean;
  status: RecommendationStatus;
  created_by: 'system' | 'teacher' | 'school_admin';
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export type ActionType = 'remediation' | 'enrichment' | 'parent_meeting' | 'assessment_review' | 'teaching_review' | 'counseling' | 'custom';
export type ActionPriority = 'low' | 'medium' | 'high';
export type ActionStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';

export interface ActionPlan {
  id: string;
  school_id: string;
  academic_year_id: string;
  term_id?: string;
  month_id?: string;
  class_id: string;
  student_id?: string;
  recommendation_id?: string;
  title_en: string;
  title_fr: string;
  description_en: string;
  description_fr: string;
  action_type: ActionType;
  priority: ActionPriority;
  due_date?: string;
  assigned_to?: string;
  status: ActionStatus;
  outcome_en?: string;
  outcome_fr?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}
