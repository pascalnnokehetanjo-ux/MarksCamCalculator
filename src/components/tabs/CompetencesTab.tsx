import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Plus, Edit } from 'lucide-react';
import { Competence } from '../../types/markscam';

export const CompetencesTab: React.FC = () => {
  const { competences, setCompetences, language } = useApp();
  const [editingComp, setEditingComp] = useState<Competence | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [nameEn, setNameEn] = useState('');
  const [nameFr, setNameFr] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descFr, setDescFr] = useState('');
  const [code, setCode] = useState('');

  const handleOpenEdit = (comp: Competence) => {
    setEditingComp(comp);
    setNameEn(comp.name_en);
    setNameFr(comp.name_fr);
    setDescEn(comp.description_en);
    setDescFr(comp.description_fr);
    setCode(comp.code);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingComp) {
      setCompetences(competences.map(c => c.id === editingComp.id ? {
        ...c,
        name_en: nameEn,
        name_fr: nameFr,
        description_en: descEn,
        description_fr: descFr,
        code,
      } : c));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <Award className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Compétences Officielles (6)' : 'Editable Competences (6)'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Les 6 compétences fondamentales requises par le système d\'évaluation camerounais.'
              : 'The six core competences required by Cameroonian competency-based assessment.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competences.map((comp, idx) => (
          <div key={comp.id} className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg accent-green text-white flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </span>
                <span className="font-mono text-[11px] font-semibold text-secondary">{comp.code}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-primary">
                  {language === 'fr' ? comp.name_fr : comp.name_en}
                </h3>
                <p className="text-xs text-secondary mt-1 leading-relaxed">
                  {language === 'fr' ? comp.description_fr : comp.description_en}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-custom flex justify-end">
              <button
                onClick={() => handleOpenEdit(comp)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary hover:text-primary text-xs font-semibold cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>{language === 'fr' ? 'Modifier' : 'Edit'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Competence Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl border border-custom p-6 shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-primary">
              {language === 'fr' ? 'Modifier la Compétence' : 'Edit Competence'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Code</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-mono font-medium text-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Name (English)</label>
                <input
                  type="text"
                  required
                  value={nameEn}
                  onChange={e => setNameEn(e.target.value)}
                  className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-medium text-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Nom (Français)</label>
                <input
                  type="text"
                  required
                  value={nameFr}
                  onChange={e => setNameFr(e.target.value)}
                  className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-medium text-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  value={descEn}
                  onChange={e => setDescEn(e.target.value)}
                  className="w-full bg-secondary border border-custom rounded-xl p-3 text-xs font-medium text-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Description (Français)</label>
                <textarea
                  rows={2}
                  value={descFr}
                  onChange={e => setDescFr(e.target.value)}
                  className="w-full bg-secondary border border-custom rounded-xl p-3 text-xs font-medium text-primary focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-custom flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-custom bg-secondary text-secondary font-semibold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl accent-green text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Save Competence
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
