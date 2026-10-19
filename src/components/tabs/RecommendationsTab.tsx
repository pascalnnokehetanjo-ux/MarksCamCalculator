import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, CheckCircle, ArrowRight, Plus, Check, X } from 'lucide-react';
import { Recommendation, ActionPlan } from '../../types/markscam';
import { generateInitialRecommendations } from '../../utils/analyticsEngine';

export const RecommendationsTab: React.FC = () => {
  const { school, classes, students, subjects, competences, language } = useApp();
  const [recommendations, setRecommendations] = useState<Recommendation[]>(() => 
    generateInitialRecommendations(school.id, classes[0]?.id || 'class-form1-bil', students, subjects, competences)
  );
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleAccept = (id: string) => {
    setRecommendations(recommendations.map(r => r.id === id ? { ...r, status: 'accepted' } : r));
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  const handleDismiss = (id: string) => {
    setRecommendations(recommendations.map(r => r.id === id ? { ...r, status: 'dismissed' } : r));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <AlertCircle className="w-6 h-6 text-amber-600" />
            <span>{language === 'fr' ? 'Boîte de Réception des Recommandations' : 'Recommendation Inbox & Decision Support'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Examinez les suggestions générées par le système et convertissez-les en plans d\'action.'
              : 'Review system-generated recommendations, view empirical evidence, and convert them into actionable plans.'}
          </p>
        </div>
        {successMsg && (
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold shadow-xs">
            <CheckCircle className="w-4 h-4" />
            <span>{language === 'fr' ? 'Recommandation acceptée !' : 'Recommendation accepted!'}</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {recommendations.map(rec => {
          const std = students.find(s => s.id === rec.student_id);

          return (
            <div key={rec.id} className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                    rec.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                  }`}>
                    {rec.severity}
                  </span>
                  <span className="font-mono text-xs font-bold text-secondary">Rule: {rec.trigger_rule}</span>
                </div>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                  rec.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  {rec.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-primary">{language === 'fr' ? rec.title_fr : rec.title_en}</h3>
                {std && <p className="text-xs font-semibold text-secondary mt-0.5">Student: {std.last_name} {std.first_name} ({std.admission_number})</p>}
                <p className="text-xs text-primary mt-2 leading-relaxed bg-secondary p-3.5 rounded-xl border border-custom">
                  {language === 'fr' ? rec.recommendation_fr : rec.recommendation_en}
                </p>
              </div>

              {rec.status === 'open' && (
                <div className="pt-3 border-t border-custom flex justify-end space-x-3">
                  <button
                    onClick={() => handleDismiss(rec.id)}
                    className="inline-flex items-center space-x-1 px-4 py-2 rounded-xl border border-custom bg-secondary text-secondary font-semibold text-xs cursor-pointer hover:text-primary"
                  >
                    <X className="w-3.5 h-3.5 mr-1" />
                    <span>Dismiss</span>
                  </button>
                  <button
                    onClick={() => handleAccept(rec.id)}
                    className="inline-flex items-center space-x-1 px-4 py-2 rounded-xl accent-green text-white font-bold text-xs shadow-md cursor-pointer hover:opacity-95"
                  >
                    <Check className="w-3.5 h-3.5 mr-1" />
                    <span>Accept Recommendation</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
