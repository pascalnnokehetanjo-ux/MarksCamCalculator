import { Recommendation, Student, Subject, Competence, AppreciationRule } from '../types/markscam';

export function generateInitialRecommendations(
  schoolId: string,
  classId: string,
  students: Student[],
  subjects: Subject[],
  competences: Competence[]
): Recommendation[] {
  const recommendations: Recommendation[] = [
    {
      id: 'rec-001',
      school_id: schoolId,
      academic_year_id: 'ay-2025-2026',
      term_id: 'term-1',
      month_id: 'm-sep',
      class_id: classId,
      student_id: students[1]?.id || 'std-002',
      subject_id: subjects[0]?.id || 'subj-eng',
      recommendation_type: 'low_performance',
      severity: 'critical',
      title_en: 'Low Performance in English Language',
      title_fr: 'Faible Performance en Langue Anglaise',
      evidence_json: JSON.stringify({ score: 8.5, max_mark: 20, percentage: 42.5 }),
      trigger_rule: 'percentage < 50%',
      recommendation_en: 'Provide targeted remedial support in grammar and reading comprehension; schedule a parent discussion.',
      recommendation_fr: 'Fournir un soutien de rattrapage ciblé en grammaire et compréhension; planifier une rencontre avec les parents.',
      ai_generated: false,
      status: 'open',
      created_by: 'system',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'rec-002',
      school_id: schoolId,
      academic_year_id: 'ay-2025-2026',
      term_id: 'term-1',
      month_id: 'm-sep',
      class_id: classId,
      student_id: students[0]?.id || 'std-001',
      competence_id: competences[1]?.id || 'comp-2',
      recommendation_type: 'strong_performance',
      severity: 'info',
      title_en: 'Strong Performance in Mathematics & Science (C2)',
      title_fr: 'Forte Performance en Mathématiques & Sciences (C2)',
      evidence_json: JSON.stringify({ score: 18.0, max_mark: 20, percentage: 90.0 }),
      trigger_rule: 'percentage >= 85.1%',
      recommendation_en: 'Provide advanced enrichment problem sets to foster exceptional creativity and analytical reasoning.',
      recommendation_fr: 'Fournir des exercices d\'enrichissement avancés pour stimuler la créativité et le raisonnement analytique.',
      ai_generated: false,
      status: 'open',
      created_by: 'system',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  return recommendations;
}
