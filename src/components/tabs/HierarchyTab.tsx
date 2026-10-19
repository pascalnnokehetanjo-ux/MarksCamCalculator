import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, ChevronDown, ChevronRight, Edit, Shield } from 'lucide-react';
import { Competence, CompetenceItem } from '../../types/markscam';

export const HierarchyTab: React.FC = () => {
  const { competences, competenceItems, setCompetenceItems, language } = useApp();
  const [expandedCompId, setExpandedCompId] = useState<string | null>('comp-1');
  const [editingItem, setEditingItem] = useState<CompetenceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [nameEn, setNameEn] = useState('');
  const [nameFr, setNameFr] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descFr, setDescFr] = useState('');

  const toggleExpand = (compId: string) => {
    setExpandedCompId(expandedCompId === compId ? null : compId);
  };

  const handleOpenEditItem = (item: CompetenceItem) => {
    setEditingItem(item);
    setNameEn(item.name_en);
    setNameFr(item.name_fr);
    setDescEn(item.description_en);
    setDescFr(item.description_fr);
    setIsModalOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setCompetenceItems(competenceItems.map(ci => ci.id === editingItem.id ? {
        ...ci,
        name_en: nameEn,
        name_fr: nameFr,
        description_en: descEn,
        description_fr: descFr,
      } : ci));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <Award className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Hiérarchie Officielle des 6 Compétences' : 'Official Six-Competence Hierarchy'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Structure officielle du Ministère des Enseignements Secondaires / de Base au Cameroun.'
              : 'Official Cameroonian curriculum structure featuring 6 core competences and sub-competence items.'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {competences.map((comp, idx) => {
          const items = competenceItems.filter(ci => ci.competence_id === comp.id);
          const isExpanded = expandedCompId === comp.id;

          return (
            <div key={comp.id} className="bg-card rounded-2xl border border-custom shadow-xs overflow-hidden">
              <div
                onClick={() => toggleExpand(comp.id)}
                className="p-5 flex items-center justify-between cursor-pointer bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl accent-green text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {comp.code}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-primary">
                      {language === 'fr' ? comp.name_fr : comp.name_en}
                    </h3>
                    <p className="text-xs text-secondary mt-0.5">
                      {language === 'fr' ? comp.description_fr : comp.description_en}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                    {items.length} {language === 'fr' ? 'éléments' : 'items'}
                  </span>
                  {isExpanded ? <ChevronDown className="w-5 h-5 text-secondary" /> : <ChevronRight className="w-5 h-5 text-secondary" />}
                </div>
              </div>

              {isExpanded && (
                <div className="p-5 divide-y divide-custom bg-card">
                  {items.map(item => (
                    <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between">
                      <div className="space-y-1 pl-4 border-l-2 border-emerald-500">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">{item.code}</span>
                          <h4 className="text-xs font-bold text-primary">{language === 'fr' ? item.name_fr : item.name_en}</h4>
                        </div>
                        <p className="text-[11px] text-secondary">{language === 'fr' ? item.description_fr : item.description_en}</p>
                      </div>

                      <button
                        onClick={() => handleOpenEditItem(item)}
                        className="p-2 rounded-lg bg-secondary text-secondary hover:text-primary transition-colors cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Edit Competence Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl border border-custom p-6 shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-primary">
              {language === 'fr' ? 'Modifier l\'élément de compétence' : 'Edit Competence Item'} ({editingItem?.code})
            </h3>

            <form onSubmit={handleSaveItem} className="space-y-4">
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
