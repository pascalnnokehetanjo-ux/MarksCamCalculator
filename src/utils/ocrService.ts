import { MarksheetPhoto, OcrExtraction, Student, StudentMark } from '../types/markscam';

/**
 * Simulates OCR extraction on an uploaded marksheet photo.
 */
export function simulateOcrExtraction(
  photo: MarksheetPhoto,
  students: Student[]
): OcrExtraction[] {
  const extractions: OcrExtraction[] = [];
  const classStudents = students.filter(s => s.class_id === photo.class_id);

  classStudents.forEach((student, rowIndex) => {
    // 1. Admission number cell
    extractions.push({
      id: `ext-${photo.id}-${rowIndex}-0`,
      marksheet_photo_id: photo.id,
      school_id: photo.school_id,
      row_index: rowIndex,
      column_index: 0,
      raw_text: student.admission_number,
      normalized_text: student.admission_number,
      cell_type: 'admission_number',
      confidence: 98.5,
      matched_student_id: student.id,
      match_status: 'matched',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    // 2. Student Name cell
    const fullName = `${student.last_name} ${student.first_name}`;
    extractions.push({
      id: `ext-${photo.id}-${rowIndex}-1`,
      marksheet_photo_id: photo.id,
      school_id: photo.school_id,
      row_index: rowIndex,
      column_index: 1,
      raw_text: fullName,
      normalized_text: fullName,
      cell_type: 'student_name',
      confidence: 94.2,
      matched_student_id: student.id,
      match_status: 'matched',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    // 3. Score cell (e.g. simulated score like 14.5 or 12.0)
    const randomScore = (10 + (rowIndex * 1.5) % 8).toFixed(1);
    extractions.push({
      id: `ext-${photo.id}-${rowIndex}-2`,
      marksheet_photo_id: photo.id,
      school_id: photo.school_id,
      row_index: rowIndex,
      column_index: 2,
      raw_text: randomScore,
      normalized_text: randomScore,
      cell_type: 'score',
      confidence: rowIndex === 2 ? 78.0 : 96.0, // simulate one low-confidence cell
      matched_student_id: student.id,
      match_status: rowIndex === 2 ? 'low_confidence' : 'matched',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  });

  return extractions;
}

/**
 * Transfers approved OCR extractions into draft student marks.
 */
export function transferOcrToStudentMarks(
  photo: MarksheetPhoto,
  extractions: OcrExtraction[],
  existingMarks: StudentMark[]
): { newMarks: StudentMark[]; createdCount: number; updatedCount: number } {
  let createdCount = 0;
  let updatedCount = 0;
  const newMarks = [...existingMarks];

  const scoreExtractions = extractions.filter(e => e.cell_type === 'score' && e.matched_student_id);

  for (const ext of scoreExtractions) {
    if (!ext.matched_student_id) continue;

    const existingIndex = newMarks.findIndex(m => 
      m.student_id === ext.matched_student_id &&
      m.month_id === photo.month_id &&
      m.subject_id === photo.subject_id &&
      m.evaluation_type_id === (photo.evaluation_type_id || 'et-written')
    );

    const scoreVal = parseFloat(ext.normalized_text) || 0;

    if (existingIndex >= 0) {
      newMarks[existingIndex] = {
        ...newMarks[existingIndex],
        score: scoreVal,
        updated_at: new Date().toISOString(),
      };
      updatedCount++;
    } else {
      newMarks.push({
        id: `mark-ocr-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        school_id: photo.school_id,
        class_id: photo.class_id,
        student_id: ext.matched_student_id,
        academic_year_id: photo.academic_year_id,
        term_id: photo.term_id,
        month_id: photo.month_id,
        competence_item_id: photo.competence_item_id || 'ci-1a',
        subject_id: photo.subject_id,
        evaluation_type_id: photo.evaluation_type_id || 'et-written',
        score: scoreVal,
        max_mark: 20,
        entered_by: photo.uploaded_by,
        status: 'draft',
        source: 'ocr',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      createdCount++;
    }
  }

  return { newMarks, createdCount, updatedCount };
}
