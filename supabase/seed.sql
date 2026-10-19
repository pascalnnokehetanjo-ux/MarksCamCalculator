-- ====================================================================
-- MARKSCAM DEMO SEED SCRIPT
-- ====================================================================

INSERT INTO schools (id, name_en, name_fr, address_en, address_fr, phone, email)
VALUES (
    'school-gbhs-yaounde',
    'Government Bilingual High School Yaoundé',
    'Lycée Bilingue d\'État de Yaoundé',
    'Mfandena, P.O. Box 1200 Yaoundé, Cameroon',
    'Mfandena, B.P. 1200 Yaoundé, Cameroun',
    '+237 222 23 45 67',
    'contact@gbhsyaounde.cm'
);

INSERT INTO academic_years (id, school_id, name_en, name_fr, start_date, end_date, is_active)
VALUES (
    'ay-2025-2026',
    'school-gbhs-yaounde',
    '2025/2026 Academic Year',
    'Année Scolaire 2025/2026',
    '2025-09-08',
    '2026-07-03',
    TRUE
);

INSERT INTO appreciation_rules (school_id, min_percentage, max_percentage, appreciation_en, appreciation_fr, grade, order_index, is_active)
VALUES
('school-gbhs-yaounde', 0.0, 50.0, 'Competences Not Acquired (CNA)', 'Compétences non acquises (CNA)', 'C', 1, TRUE),
('school-gbhs-yaounde', 50.1, 70.0, 'Competences in the Process of Acquisition (CPA)', 'Compétences en cours d’acquisition (CPA)', 'B', 2, TRUE),
('school-gbhs-yaounde', 70.1, 85.0, 'Competences Acquired (CA)', 'Compétences acquises (CA)', 'A', 3, TRUE),
('school-gbhs-yaounde', 85.1, 100.0, 'Expert (Ept)', 'Expert (Ept)', 'A+', 4, TRUE);
