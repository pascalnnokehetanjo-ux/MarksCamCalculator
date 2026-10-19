import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Database, Copy, Check } from 'lucide-react';

export const SqlSchemaTab: React.FC = () => {
  const { language } = useApp();
  const [copied, setCopied] = useState(false);

  const sqlCode = `-- ====================================================================
-- MARKSCAM POSTGRESQL / SUPABASE INITIAL SCHEMA MIGRATION
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SCHOOLS TABLE
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

-- 2. USERS & PROFILES TABLE
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

-- 3. ACADEMIC YEARS TABLE
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

-- 4. TERMS TABLE (Term 1, 2, 3)
CREATE TABLE terms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    name_en VARCHAR(100) NOT NULL,
    name_fr VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    order_index INT NOT NULL
);

-- 5. MONTHS TABLE
CREATE TABLE months (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    term_id UUID NOT NULL REFERENCES terms(id) ON DELETE CASCADE,
    name_en VARCHAR(100) NOT NULL,
    name_fr VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    order_index INT NOT NULL
);

-- 6. CLASSES TABLE
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

-- 7. STUDENTS TABLE
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

-- 8. COMPETENCES TABLE (6 editable competences)
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

-- 9. SUBJECTS TABLE
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

-- 10. EVALUATION TYPES TABLE
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

-- 11. APPRECIATION RULES TABLE
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
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <Database className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Schéma PostgreSQL & Migrations Supabase' : 'Supabase SQL Migrations & Schema'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Script DDL complet avec contraintes d\'unicité et isolation par école.'
              : 'Complete DDL migration script with school data isolation constraints and uniqueness checks.'}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl accent-green text-white font-bold text-xs shadow-md cursor-pointer hover:opacity-95"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
        </button>
      </div>

      <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-custom font-mono text-xs overflow-x-auto shadow-xl max-h-[600px] overflow-y-auto">
        <pre>{sqlCode}</pre>
      </div>
    </div>
  );
};
