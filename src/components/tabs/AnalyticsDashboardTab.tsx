import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, Users, Award, BookOpen, AlertCircle, CheckCircle, BarChart2 } from 'lucide-react';

export const AnalyticsDashboardTab: React.FC = () => {
  const { classes, students, subjects, competences, language } = useApp();
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [roleView, setRoleView] = useState<'teacher' | 'admin'>('teacher');

  const classStudents = students.filter(s => s.class_id === selectedClassId);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Tableau de Bord Analytique & Recommandations' : 'Analytics Dashboard & Decision Support'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Analyses déterministes et suggestions pédagogiques pour guider le suivi des élèves.'
              : 'Deterministic analytics and pedagogical suggestions to guide student remediation and enrichment.'}
          </p>
        </div>

        <div className="flex bg-card p-1 rounded-xl border border-custom">
          <button
            onClick={() => setRoleView('teacher')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              roleView === 'teacher' ? 'accent-green text-white shadow-sm' : 'text-secondary hover:text-primary'
            }`}
          >
            {language === 'fr' ? 'Vue Enseignant' : 'Teacher View'}
          </button>
          <button
            onClick={() => setRoleView('admin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              roleView === 'admin' ? 'accent-green text-white shadow-sm' : 'text-secondary hover:text-primary'
            }`}
          >
            {language === 'fr' ? 'Vue Admin' : 'Admin View'}
          </button>
        </div>
      </div>

      {/* Class selector */}
      <div className="bg-card p-4 rounded-2xl border border-custom shadow-xs flex items-center space-x-4">
        <label className="text-xs font-semibold text-primary">Class / Classe :</label>
        <select
          value={selectedClassId}
          onChange={e => setSelectedClassId(e.target.value)}
          className="bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
        >
          {classes.map(c => <option key={c.id} value={c.id}>{language === 'fr' ? c.name_fr : c.name_en}</option>)}
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-2">
          <div className="flex items-center justify-between text-secondary">
            <span className="text-xs font-semibold">Class Average</span>
            <BarChart2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-primary">13.85 / 20</p>
          <p className="text-[11px] text-emerald-600 font-semibold">+0.8 vs last month</p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-2">
          <div className="flex items-center justify-between text-secondary">
            <span className="text-xs font-semibold">Total Students</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-primary">{classStudents.length} Enrolled</p>
          <p className="text-[11px] text-secondary">100% Attendance rate</p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-2">
          <div className="flex items-center justify-between text-secondary">
            <span className="text-xs font-semibold">Open Recommendations</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-600">2 Actionable</p>
          <p className="text-[11px] text-secondary">Low performance & enrichment</p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-2">
          <div className="flex items-center justify-between text-secondary">
            <span className="text-xs font-semibold">Report Readiness</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-primary">92% Ready</p>
          <p className="text-[11px] text-secondary">Mandatory evaluations verified</p>
        </div>
      </div>

      {/* Performance Overview & Competences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
            {language === 'fr' ? 'Performance par Matière (Moyenne /20)' : 'Subject Performance Overview'}
          </h3>
          <div className="space-y-3">
            {subjects.slice(0, 5).map((s, i) => {
              const score = (12 + (i * 0.7) % 5).toFixed(1);
              const pct = (Number(score) / 20) * 100;

              return (
                <div key={s.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-primary">{language === 'fr' ? s.name_fr : s.name_en}</span>
                    <span className="font-mono font-bold text-emerald-600">{score} / 20</span>
                  </div>
                  <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden border border-custom">
                    <div className="accent-green h-full rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
            {language === 'fr' ? 'Performance par Compétence (C1 - C6)' : 'Competence Mastery Breakdown'}
          </h3>
          <div className="space-y-3">
            {competences.map((c, i) => {
              const pct = 70 + (i * 4) % 25;

              return (
                <div key={c.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-primary">[{c.code}] {language === 'fr' ? c.name_fr : c.name_en}</span>
                    <span className="font-mono font-bold text-emerald-600">{pct}%</span>
                  </div>
                  <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden border border-custom">
                    <div className="accent-green h-full rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
