import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Calendar,
  Layers,
  GraduationCap,
  Users,
  Award,
  BookOpen,
  CheckSquare,
  Sliders,
  Percent,
  Database,
  CheckCircle,
  ChevronRight
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, language } = useApp();

  const menuItems = [
    { id: 'profile', labelEn: 'School Profile', labelFr: 'Profil de l\'École', labelHa: 'Bayanin Makaranta', icon: Building2 },
    { id: 'academics', labelEn: 'Academic Years, Terms & Months', labelFr: 'Années, Trimestres & Mois', labelHa: 'Shekaru & Watanni', icon: Calendar },
    { id: 'classes', labelEn: 'Classes & Sections', labelFr: 'Classes & Sections', labelHa: 'Ajujuwa', icon: Layers },
    { id: 'students', labelEn: 'Student Registry', labelFr: 'Registre des Élèves', labelHa: 'Rijistar Dalibai', icon: Users },
    { id: 'competences', labelEn: 'Competences (6)', labelFr: 'Compétences (6)', labelHa: 'Kwarewa (6)', icon: Award },
    { id: 'subjects', labelEn: 'Subjects & Sub-Subjects', labelFr: 'Matières & Sous-Matières', labelHa: 'Darussa', icon: BookOpen },
    { id: 'evaluation', labelEn: 'Evaluation Types', labelFr: 'Types d\'Évaluation', labelHa: 'Nau\'in Jarrabawa', icon: CheckSquare },
    { id: 'maxmarks', labelEn: 'Class-Subject Max Marks', labelFr: 'Notes Max par Matière', labelHa: 'Matsakaicin Maki', icon: Sliders },
    { id: 'evalconfig', labelEn: 'Evaluation-Type Config', labelFr: 'Config. des Évaluations', labelHa: 'Saitin Jarrabawa', icon: Sliders },
    { id: 'appreciation', labelEn: 'Appreciation Rules', labelFr: 'Grille d\'Appréciation', labelHa: 'Dokokin Daraja', icon: Percent },
    { id: 'sql', labelEn: 'Supabase SQL & Schema', labelFr: 'Schéma SQL Supabase', labelHa: 'Tsarin SQL', icon: Database },
    { id: 'tests', labelEn: 'Validation & Unit Tests', labelFr: 'Tests & Validations', labelHa: 'Gwaje-gwajen Tsari', icon: CheckCircle },
  ];

  return (
    <aside className="w-full lg:w-72 bg-card border-r border-custom p-4 space-y-2 shrink-0">
      <div className="px-3 py-2 mb-2">
        <p className="text-[11px] font-bold tracking-wider text-secondary uppercase">
          {language === 'fr' ? 'Configuration SaaS' : language === 'ha' ? 'Saitunan Tsari' : 'SaaS Configuration'}
        </p>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const label = language === 'fr' ? item.labelFr : language === 'ha' ? item.labelHa : item.labelEn;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'accent-green text-white shadow-md font-bold'
                  : 'text-secondary hover:bg-secondary hover:text-primary'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-secondary'}`} />
                <span className="truncate">{label}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white/80' : 'text-secondary/60'}`} />
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
