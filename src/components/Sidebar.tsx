import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Calendar,
  Layers,
  Users,
  Award,
  BookOpen,
  CheckSquare,
  Sliders,
  Percent,
  Database,
  CheckCircle,
  ChevronRight,
  BarChart3,
  ListTree,
  FileText,
  TrendingUp,
  Edit3,
  Camera,
  AlertCircle,
  Sparkles,
  CheckSquare2
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, language } = useApp();

  const menuItems = [
    { id: 'onboarding', labelEn: 'School Onboarding Wizard', labelFr: 'Assistant d\'Intégration', labelHa: 'Saitin Farko', icon: Sparkles },
    { id: 'checklist', labelEn: 'Pilot Readiness Checklist', labelFr: 'Liste de Contrôle Pilote', labelHa: 'Binciken Shiri', icon: CheckSquare2 },
    { id: 'profile', labelEn: 'School Profile', labelFr: 'Profil de l\'École', labelHa: 'Bayanin Makaranta', icon: Building2 },
    { id: 'analytics', labelEn: 'Analytics & Dashboards', labelFr: 'Analyses & Tableaux de Bord', labelHa: 'Bincike', icon: TrendingUp },
    { id: 'recommendations', labelEn: 'Recommendations & Actions', labelFr: 'Recommandations & Actions', labelHa: 'Shawara', icon: AlertCircle },
    { id: 'ocr', labelEn: 'Marksheet OCR & Upload', labelFr: 'Relevés OCR & Photos', labelHa: 'Hotunan Jarrabawa', icon: Camera },
    { id: 'marks', labelEn: 'Manual Marks Entry', labelFr: 'Saisie des Notes', labelHa: 'Shigar da Mako', icon: Edit3 },
    { id: 'results', labelEn: 'Deterministic Calculations', labelFr: 'Calculs & Résultats', labelHa: 'Lissafin Sakamako', icon: BarChart3 },
    { id: 'reports', labelEn: 'Report Cards & PDFs', labelFr: 'Bulletins & PDFs', labelHa: 'Rahoton Makaranta', icon: FileText },
    { id: 'hierarchy', labelEn: 'Competence Hierarchy (C1-C6)', labelFr: 'Hiérarchie des Compétences', labelHa: 'Tsarin Kwarewa', icon: ListTree },
    { id: 'subjects', labelEn: 'Subjects & Sub-Subjects', labelFr: 'Matières & Sous-Matières', labelHa: 'Darussa', icon: BookOpen },
    { id: 'classconfigs', labelEn: 'Class Assessment Structure', labelFr: 'Structure d\'Évaluation par Classe', labelHa: 'Saitin Ajujuwa', icon: Layers },
    { id: 'maxmarks', labelEn: 'Evaluation Max Marks (Rule 1)', labelFr: 'Notes Max par Évaluation', labelHa: 'Matsakaicin Maki', icon: Sliders },
    { id: 'preview', labelEn: 'Assessment Structure Preview', labelFr: 'Aperçu & Calculs de Compétences', labelHa: 'Binciken Tsari', icon: BarChart3 },
    { id: 'academics', labelEn: 'Academic Years, Terms & Months', labelFr: 'Années, Trimestres & Mois', labelHa: 'Shekaru & Watanni', icon: Calendar },
    { id: 'classes', labelEn: 'Classes & Sections', labelFr: 'Classes & Sections', labelHa: 'Ajujuwa', icon: Layers },
    { id: 'students', labelEn: 'Student Registry', labelFr: 'Registre des Élèves', labelHa: 'Rijistar Dalibai', icon: Users },
    { id: 'evaluation', labelEn: 'Evaluation Types', labelFr: 'Types d\'Évaluation', labelHa: 'Nau\'in Jarrabawa', icon: CheckSquare },
    { id: 'appreciation', labelEn: 'Appreciation Rules', labelFr: 'Grille d\'Appréciation', labelHa: 'Dokokin Daraja', icon: Percent },
    { id: 'sql', labelEn: 'Supabase SQL & Schema', labelFr: 'Schéma SQL Supabase', labelHa: 'Tsarin SQL', icon: Database },
    { id: 'tests', labelEn: 'Validation & Unit Tests', labelFr: 'Tests & Validations', labelHa: 'Gwaje-gwajen Tsari', icon: CheckCircle },
  ];

  return (
    <>
      {/* Mobile Select Dropdown for Navigation */}
      <div className="block lg:hidden bg-card border-b border-custom p-3">
        <label className="block text-[10px] font-bold text-secondary uppercase mb-1">
          {language === 'fr' ? 'Configuration SaaS' : 'Dashboard Section'}
        </label>
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="w-full bg-secondary border border-custom rounded-xl px-3 py-2 text-xs font-semibold text-primary focus:outline-none"
        >
          {menuItems.map(item => (
            <option key={item.id} value={item.id}>
              {language === 'fr' ? item.labelFr : language === 'ha' ? item.labelHa : item.labelEn}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 bg-card border-r border-custom p-4 space-y-2 shrink-0">
        <div className="px-3 py-2 mb-2">
          <p className="text-[11px] font-bold tracking-wider text-secondary uppercase">
            {language === 'fr' ? 'Configuration SaaS' : 'SaaS Configuration'}
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
    </>
  );
};
