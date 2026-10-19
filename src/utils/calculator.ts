import { AppreciationRule, StudentMark, Subject, SubSubject, EvaluationType } from '../types/markscam';

/**
 * Determines the appreciation and grade for a given percentage based on school appreciation rules.
 */
export function getAppreciationForPercentage(
  percentage: number,
  rules: AppreciationRule[]
): { appreciation_en: string; appreciation_fr: string; grade: string } {
  const activeRules = rules.filter(r => r.is_active).sort((a, b) => a.min_percentage - b.min_percentage);
  
  for (const rule of activeRules) {
    if (percentage >= rule.min_percentage && percentage <= rule.max_percentage) {
      return {
        appreciation_en: rule.appreciation_en,
        appreciation_fr: rule.appreciation_fr,
        grade: rule.grade,
      };
    }
  }

  // Fallback to last rule or default
  const last = activeRules[activeRules.length - 1];
  if (last) {
    return { appreciation_en: last.appreciation_en, appreciation_fr: last.appreciation_fr, grade: last.grade };
  }

  return { appreciation_en: 'Competences Not Acquired', appreciation_fr: 'Compétences non acquises', grade: 'C' };
}

/**
 * Calculates monthly subject/sub-subject score and max mark from student marks.
 */
export function calculateSubjectMonthlyResult(
  marks: StudentMark[],
  subjectId: string,
  subSubjectId?: string
) {
  const relevantMarks = marks.filter(m => 
    subSubjectId ? m.sub_subject_id === subSubjectId : m.subject_id === subjectId && !m.sub_subject_id
  );

  let totalScore = 0;
  let totalMax = 0;

  for (const mark of relevantMarks) {
    totalScore += mark.score;
    totalMax += mark.max_mark;
  }

  const percentage = totalMax > 0 ? (totalScore / totalMax) * 100 : 0;
  return { score: totalScore, max_mark: totalMax, percentage };
}

/**
 * Calculates student monthly average out of 20 across all active subjects/competences.
 * Formula: (20 * sum(subject scores)) / sum(max marks of all active subjects)
 */
export function calculateStudentMonthlyAverage(
  subjectResults: { score: number; max_mark: number }[]
): number {
  let totalScore = 0;
  let totalMax = 0;

  for (const res of subjectResults) {
    totalScore += res.score;
    totalMax += res.max_mark;
  }

  if (totalMax === 0) return 0;
  const avg = (20 * totalScore) / totalMax;
  return Math.round(avg * 100) / 100; // rounded to 2 decimals
}
