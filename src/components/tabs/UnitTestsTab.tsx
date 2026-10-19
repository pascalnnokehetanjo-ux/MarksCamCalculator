import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, XCircle, Play, Shield } from 'lucide-react';
import { runUnitTests } from '../../utils/validators';

export const UnitTestsTab: React.FC = () => {
  const { language } = useApp();
  const [testResults, setTestResults] = useState<{ name: string; passed: boolean; message: string }[]>(() => runUnitTests());
  const [isRunning, setIsRunning] = useState(false);

  const handleRunTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      setTestResults(runUnitTests());
      setIsRunning(false);
    }, 400);
  };

  const allPassed = testResults.every(t => t.passed);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <Shield className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Tests Unitaires & Validations' : 'Validation Suite & Unit Tests'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Vérification automatique des règles d\'appréciation et de l\'isolation multilocataire.'
              : 'Automated verification of appreciation range coverage and school multi-tenant data isolation.'}
          </p>
        </div>
        <button
          onClick={handleRunTests}
          disabled={isRunning}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl accent-green text-white font-bold text-xs shadow-md cursor-pointer hover:opacity-95"
        >
          <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
          <span>{language === 'fr' ? 'Exécuter les Tests' : 'Run Unit Tests'}</span>
        </button>
      </div>

      <div className={`p-4 rounded-xl border flex items-center space-x-3 ${
        allPassed
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
          : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
      }`}>
        {allPassed ? <CheckCircle className="w-6 h-6 shrink-0" /> : <XCircle className="w-6 h-6 shrink-0" />}
        <div className="text-xs">
          <p className="font-bold text-sm">
            {allPassed
              ? (language === 'fr' ? 'Tous les tests unitaires ont réussi avec succès !' : 'All unit tests passed successfully!')
              : (language === 'fr' ? 'Certains tests ont échoué.' : 'Some tests failed verification.')}
          </p>
          <p className="text-[11px] opacity-80 mt-0.5">
            {testResults.filter(t => t.passed).length} of {testResults.length} test suites passed.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {testResults.map((test, index) => (
          <div key={index} className="bg-card p-5 rounded-2xl border border-custom shadow-xs flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                {test.passed ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                <h3 className="text-sm font-bold text-primary">{test.name}</h3>
              </div>
              <p className="text-xs text-secondary pl-6">{test.message}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
              test.passed ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300'
            }`}>
              {test.passed ? 'PASSED' : 'FAILED'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
