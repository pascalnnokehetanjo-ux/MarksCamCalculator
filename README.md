# MarksCam - Bilingual Cameroonian School Assessment SaaS

MarksCam is a bilingual Cameroonian school assessment SaaS foundation supporting English and French curricula, multi-tenancy school isolation, academic years, terms, classes, student registries, competences, subjects, evaluation types, and appreciation rules.

---

## Tech Stack & Architecture

- **Frontend**: React SPA on Vite, TypeScript, Tailwind CSS v4, Lucide React, Plus Jakarta Sans typography.
- **Backend & Database**: Supabase (PostgreSQL, Supabase Auth, Supabase Storage) with modular domain separation.
- **Bilingual Core**: Native, independent English (`en`), French (`fr`), and Hausa (`ha`) interface content systems with zero runtime machine translation.

---

## Key Features Built in Phase 1

1. **Database Schema & SQL Migrations**: Complete PostgreSQL DDL schema with foreign key constraints, unique school-level subject codes, unique student admission numbers, and appreciation ranges.
2. **Appreciation Rules Validator**: Real-time validation ensuring continuous 0% to 100% boundary coverage without gaps or overlaps.
3. **Multi-Tenant School Isolation**: Enforced school_id scoping across students, subjects, classes, and configurations.
4. **Bilingual Admin Dashboard**: Configurable school profile, academic terms, student registry, 6 core competences, 10 Cameroonian subjects, oral/written mandatory evaluations, and grading appreciation rules.

---

## Local Setup & Run Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## Supabase & Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com).
2. Run the migration script located in `/supabase/migrations/001_initial_schema.sql` in your Supabase SQL Editor.
3. Run the seed script located in `/supabase/seed.sql` to populate the demo school (Government Bilingual High School Yaoundé).
4. Configure your environment variables in `.env.example` as `.env`:
   ```env
   VITE_SUPABASE_URL="your-supabase-url"
   VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
   ```
