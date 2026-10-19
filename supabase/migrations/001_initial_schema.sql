-- ====================================================================
-- MARKSCAM POSTGRESQL / SUPABASE INITIAL SCHEMA MIGRATION (Phase 1)
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SCHOOLS
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(255) NOT NULL,
    name_fr VARCHAR(255) NOT NULL,
    logo_url TEXT,
    address_en TEXT,
    address_fr TEXT,
    phone VARCHAR(50),
    email VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. USERS & PROFILES
CREATE TYPE user_role AS ENUM ('super_admin', 'school_admin', 'teacher', 'viewer');

CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'teacher',
    phone VARCHAR(50),
    language_preference VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ACADEMIC YEARS
CREATE TABLE academic_years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name_en VARCHAR(100) NOT NULL,
    name_fr VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TERMS
CREATE TABLE terms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    name_en VARCHAR(100) NOT NULL,
    name_fr VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    order_index INT NOT NULL
);

-- 5. MONTHS
CREATE TABLE months (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    term_id UUID NOT NULL REFERENCES terms(id) ON DELETE CASCADE,
    name_en VARCHAR(100) NOT NULL,
    name_fr VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    order_index INT NOT NULL
);

-- 6. CLASSES
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    name_en VARCHAR(100) NOT NULL,
    name_fr VARCHAR(100) NOT NULL,
    level VARCHAR(50) NOT NULL,
    section VARCHAR(50) NOT NULL,
    capacity INT DEFAULT 50,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. STUDENTS
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    admission_number VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    other_names VARCHAR(100),
    gender VARCHAR(10) NOT NULL,
    date_of_birth DATE NOT NULL,
    photo_url TEXT,
    guardian_name VARCHAR(255) NOT NULL,
    guardian_phone VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_admission_per_school UNIQUE (school_id, admission_number)
);

-- 8. COMPETENCES
CREATE TABLE competences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_fr VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_fr TEXT,
    order_index INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    CONSTRAINT unique_competence_code_per_school UNIQUE (school_id, code)
);

-- 9. SUBJECTS
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_fr VARCHAR(255) NOT NULL,
    short_name_en VARCHAR(50) NOT NULL,
    short_name_fr VARCHAR(50) NOT NULL,
    order_index INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    has_sub_subjects BOOLEAN DEFAULT FALSE,
    CONSTRAINT unique_subject_code_per_school UNIQUE (school_id, code)
);

-- 10. EVALUATION TYPES
CREATE TABLE evaluation_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_fr VARCHAR(100) NOT NULL,
    is_mandatory BOOLEAN DEFAULT FALSE,
    order_index INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- 11. APPRECIATION RULES
CREATE TABLE appreciation_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    min_percentage DECIMAL(5,2) NOT NULL,
    max_percentage DECIMAL(5,2) NOT NULL,
    appreciation_en VARCHAR(255) NOT NULL,
    appreciation_fr VARCHAR(255) NOT NULL,
    grade VARCHAR(10) NOT NULL,
    order_index INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);
