-- ====================================================================
-- MARKSCAM SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Enable RLS on all multi-tenant tables
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE months ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE competences ENABLE ROW LEVEL SECURITY;
ALTER TABLE competence_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_competence_item_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluation_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE appreciation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_monthly_summaries ENABLE ROW LEVEL SECURITY;

-- Helper function to get user's school_id from profiles
CREATE OR REPLACE FUNCTION auth.user_school_id()
RETURNS UUID AS $$
BEGIN
  RETURN (SELECT school_id FROM profiles WHERE auth_user_id = auth.uid() LIMIT 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. SCHOOLS POLICY: Users can view their own school
CREATE POLICY school_isolation_policy ON schools
    FOR ALL
    USING (id = auth.user_school_id());

-- 2. PROFILES POLICY
CREATE POLICY profile_isolation_policy ON profiles
    FOR ALL
    USING (school_id = auth.user_school_id());

-- 3. STUDENTS POLICY
CREATE POLICY student_isolation_policy ON students
    FOR ALL
    USING (school_id = auth.user_school_id());

-- 4. STUDENT MARKS POLICY
CREATE POLICY marks_isolation_policy ON student_marks
    FOR ALL
    USING (school_id = auth.user_school_id());
