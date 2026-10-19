import React from 'react';
import { useApp } from '../context/AppContext';
import { Sidebar } from './Sidebar';
import { SchoolProfileTab } from './tabs/SchoolProfileTab';
import { AcademicsTab } from './tabs/AcademicsTab';
import { ClassesTab } from './tabs/ClassesTab';
import { StudentsTab } from './tabs/StudentsTab';
import { EvaluationTypesTab } from './tabs/EvaluationTypesTab';
import { AppreciationRulesTab } from './tabs/AppreciationRulesTab';
import { SqlSchemaTab } from './tabs/SqlSchemaTab';
import { UnitTestsTab } from './tabs/UnitTestsTab';
import { HierarchyTab } from './tabs/HierarchyTab';
import { SubjectsSubSubjectsTab } from './tabs/SubjectsSubSubjectsTab';
import { ClassCompetenceConfigTab } from './tabs/ClassCompetenceConfigTab';
import { MaxMarksConfigTab } from './tabs/MaxMarksConfigTab';
import { AssessmentPreviewTab } from './tabs/AssessmentPreviewTab';
import { MarksEntryTab } from './tabs/MarksEntryTab';
import { CalculatedResultsTab } from './tabs/CalculatedResultsTab';
import { ReportCardsTab } from './tabs/ReportCardsTab';
import { OcrManagerTab } from './tabs/OcrManagerTab';
import { AnalyticsDashboardTab } from './tabs/AnalyticsDashboardTab';
import { RecommendationsTab } from './tabs/RecommendationsTab';
import { OnboardingWizardTab } from './tabs/OnboardingWizardTab';
import { PilotChecklistTab } from './tabs/PilotChecklistTab';

export const Dashboard: React.FC = () => {
  const { activeTab } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'onboarding': return <OnboardingWizardTab />;
      case 'checklist': return <PilotChecklistTab />;
      case 'profile': return <SchoolProfileTab />;
      case 'analytics': return <AnalyticsDashboardTab />;
      case 'recommendations': return <RecommendationsTab />;
      case 'ocr': return <OcrManagerTab />;
      case 'marks': return <MarksEntryTab />;
      case 'results': return <CalculatedResultsTab />;
      case 'reports': return <ReportCardsTab />;
      case 'hierarchy': return <HierarchyTab />;
      case 'subjects': return <SubjectsSubSubjectsTab />;
      case 'classconfigs': return <ClassCompetenceConfigTab />;
      case 'maxmarks': return <MaxMarksConfigTab />;
      case 'preview': return <AssessmentPreviewTab />;
      case 'academics': return <AcademicsTab />;
      case 'classes': return <ClassesTab />;
      case 'students': return <StudentsTab />;
      case 'evaluation': return <EvaluationTypesTab />;
      case 'appreciation': return <AppreciationRulesTab />;
      case 'sql': return <SqlSchemaTab />;
      case 'tests': return <UnitTestsTab />;
      default: return <OnboardingWizardTab />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-secondary flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10 max-w-7xl overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};
