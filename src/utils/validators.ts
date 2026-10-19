import { AppreciationRule, Student, Subject } from '../types/markscam';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates appreciation rules:
 * - Must cover from 0% to 100% without gaps or overlaps.
 * - min_percentage < max_percentage.
 */
export function validateAppreciationRules(rules: AppreciationRule[]): ValidationResult {
  const errors: string[] = [];
  if (!rules || rules.length === 0) {
    return { isValid: false, errors: ['At least one appreciation rule is required.'] };
  }

  // Sort by min_percentage
  const sorted = [...rules].filter(r => r.is_active).sort((a, b) => a.min_percentage - b.min_percentage);

  if (sorted.length === 0) {
    return { isValid: false, errors: ['At least one active appreciation rule is required.'] };
  }

  // Check first starts around 0
  if (sorted[0].min_percentage > 0.0) {
    errors.push(`Appreciation rules must start at 0.0%, but current minimum is ${sorted[0].min_percentage}%.`);
  }

  // Check last ends at 100
  const lastRule = sorted[sorted.length - 1];
  if (lastRule.max_percentage < 100.0) {
    errors.push(`Appreciation rules must reach 100.0%, but current maximum is ${lastRule.max_percentage}%.`);
  }

  // Check for gaps or overlaps
  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i];
    if (current.min_percentage >= current.max_percentage) {
      errors.push(`Rule "${current.appreciation_en}" has invalid range: min (${current.min_percentage}%) must be less than max (${current.max_percentage}%).`);
    }

    if (i < sorted.length - 1) {
      const next = sorted[i + 1];
      // Expect next.min_percentage to be current.max_percentage + 0.1 (or adjacent)
      const diff = Math.round((next.min_percentage - current.max_percentage) * 10) / 10;
      if (diff !== 0.1 && diff !== 0) {
        errors.push(`Gap or overlap detected between range (${current.min_percentage}%-${current.max_percentage}%) and (${next.min_percentage}%-${next.max_percentage}%).`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates that student admission number is unique within the school.
 */
export function validateStudentAdmissionNumber(
  admissionNumber: string,
  existingStudents: Student[],
  currentStudentId?: string
): ValidationResult {
  const errors: string[] = [];
  const trimmed = admissionNumber.trim();
  if (!trimmed) {
    errors.push('Admission number cannot be empty.');
  } else {
    const duplicate = existingStudents.find(
      s => s.admission_number.toLowerCase() === trimmed.toLowerCase() && s.id !== currentStudentId
    );
    if (duplicate) {
      errors.push(`Admission number "${trimmed}" already exists for another student in this school.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates that subject code is unique within the school.
 */
export function validateSubjectCode(
  code: string,
  existingSubjects: Subject[],
  currentSubjectId?: string
): ValidationResult {
  const errors: string[] = [];
  const trimmed = code.trim().toUpperCase();
  if (!trimmed) {
    errors.push('Subject code cannot be empty.');
  } else {
    const duplicate = existingSubjects.find(
      s => s.code.toUpperCase() === trimmed && s.id !== currentSubjectId
    );
    if (duplicate) {
      errors.push(`Subject code "${trimmed}" is already assigned to another subject in this school.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Unit tests runner for validation logic and school data isolation.
 */
export function runUnitTests(): { name: string; passed: boolean; message: string }[] {
  const testResults: { name: string; passed: boolean; message: string }[] = [];

  // Test 1: Appreciation range valid 0-100 coverage
  try {
    const validRules: AppreciationRule[] = [
      { id: '1', school_id: 's1', min_percentage: 0.0, max_percentage: 50.0, appreciation_en: 'CNA', appreciation_fr: 'CNA', grade: 'C', order_index: 1, is_active: true },
      { id: '2', school_id: 's1', min_percentage: 50.1, max_percentage: 70.0, appreciation_en: 'CPA', appreciation_fr: 'CPA', grade: 'B', order_index: 2, is_active: true },
      { id: '3', school_id: 's1', min_percentage: 70.1, max_percentage: 85.0, appreciation_en: 'CA', appreciation_fr: 'CA', grade: 'A', order_index: 3, is_active: true },
      { id: '4', school_id: 's1', min_percentage: 85.1, max_percentage: 100.0, appreciation_en: 'Expert', appreciation_fr: 'Expert', grade: 'A+', order_index: 4, is_active: true },
    ];
    const res = validateAppreciationRules(validRules);
    testResults.push({
      name: 'Appreciation Ranges 0% to 100% Coverage Test',
      passed: res.isValid,
      message: res.isValid ? 'Successfully verified continuous 0% - 100% ranges.' : res.errors.join(', '),
    });
  } catch (err: any) {
    testResults.push({ name: 'Appreciation Ranges Test', passed: false, message: err.message });
  }

  // Test 2: Appreciation range with gap
  try {
    const gappedRules: AppreciationRule[] = [
      { id: '1', school_id: 's1', min_percentage: 0.0, max_percentage: 40.0, appreciation_en: 'CNA', appreciation_fr: 'CNA', grade: 'C', order_index: 1, is_active: true },
      { id: '2', school_id: 's1', min_percentage: 50.0, max_percentage: 100.0, appreciation_en: 'CA', appreciation_fr: 'CA', grade: 'A', order_index: 2, is_active: true },
    ];
    const res = validateAppreciationRules(gappedRules);
    testResults.push({
      name: 'Appreciation Gap Detection Test',
      passed: !res.isValid,
      message: !res.isValid ? 'Correctly flagged gap between 40% and 50%.' : 'Failed to detect gap.',
    });
  } catch (err: any) {
    testResults.push({ name: 'Appreciation Gap Detection Test', passed: false, message: err.message });
  }

  // Test 3: Duplicate student admission number
  try {
    const existingStudents: Student[] = [
      { id: '1', school_id: 's1', class_id: 'c1', admission_number: 'GBHS/001', first_name: 'John', last_name: 'Doe', gender: 'M', date_of_birth: '2012-01-01', guardian_name: 'Dad', guardian_phone: '123', is_active: true, created_at: '', updated_at: '' }
    ];
    const res = validateStudentAdmissionNumber('GBHS/001', existingStudents);
    testResults.push({
      name: 'Duplicate Student Admission Number Prevention Test',
      passed: !res.isValid,
      message: !res.isValid ? 'Correctly prevented duplicate admission number.' : 'Failed to prevent duplicate.',
    });
  } catch (err: any) {
    testResults.push({ name: 'Duplicate Student Admission Test', passed: false, message: err.message });
  }

  // Test 4: School Data Isolation Check
  try {
    const schoolAStudents: Student[] = [
      { id: '1', school_id: 'school-A', class_id: 'c1', admission_number: 'A/001', first_name: 'Alice', last_name: 'Smith', gender: 'F', date_of_birth: '2012-01-01', guardian_name: 'Mom', guardian_phone: '123', is_active: true, created_at: '', updated_at: '' }
    ];
    const schoolBCheck = validateStudentAdmissionNumber('A/001', schoolAStudents); // same admission number in school B should be allowed
    testResults.push({
      name: 'Multi-Tenant School Data Isolation Test',
      passed: schoolBCheck.isValid,
      message: schoolBCheck.isValid ? 'School isolation verified: admission numbers are scoped per school.' : 'School isolation check failed.',
    });
  } catch (err: any) {
    testResults.push({ name: 'School Data Isolation Test', passed: false, message: err.message });
  }

  return testResults;
}
