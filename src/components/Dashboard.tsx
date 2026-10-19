import React from 'react';
import { useApp } from '../context/AppContext';
import { Sidebar } from './Sidebar';
import { SchoolProfileTab } from './tabs/SchoolProfileTab';
import { AcademicsTab } from './tabs/AcademicsTab';
import { ClassesTab } from './tabs/ClassesTab';
import { StudentsTab } from './tabs/StudentsTab';
import { CompetencesTab } from './tabs/CompetencesTab';
import { SubjectsTab } from './tabs/SubjectsTab';
import { EvaluationTypesTab } from './tabs/EvaluationTypesTab';
import { MaxMarksTab } from './tabs/MaxMarksTab';
import { EvalConfigTab } from './tabs/EvalConfigTab';
import { AppreciationRulesTab } from './tabs/AppreciationRulesTab';
import { SqlSchemaTab } from './tabs/SqlSchemaTab';
import { UnitTestsTab } from './tabs/UnitTestsTab';

export const Dashboard: React.FC = () => {
  const { activeTab } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return <SchoolProfileTab />;
      case 'academics': return <AcademicsTab />;
      case 'classes': return <ClassesTab />;
      case 'students': return <StudentsTab />;
      case 'competences': return <CompetencesTab />;
      case 'subjects': return <SubjectsTab />;
      case 'evaluation': return <EvaluationTypesTab />;
      case 'maxmarks': return <MaxMarksTab />;
      case 'evalconfig': return <EvalConfigTab />;
      case 'appreciation': return <AppreciationRulesTab />;
      case 'sql': return <SqlSchemaTab />;
      case 'tests': return <UnitTestsTab />;
      default: return <SchoolProfileTab />;
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
