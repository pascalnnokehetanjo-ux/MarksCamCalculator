import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Plus, Edit, Trash2, Layers } from 'lucide-react';
import { Subject, SubSubject } from '../../types/markscam';

export const SubjectsSubSubjectsTab: React.FC = () => {
  const { subjects, setSubjects, subSubjects, setSubSubjects, competenceItems, language } = useApp();
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [selectedSubjectForSub, setSelectedSubjectForSub] = useState<Subject | null>(null);

  const [code, setCode] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [nameFr, setNameFr] = useState('');
  const [shortEn, setShortEn] = useState('');
  const [shortFr, setShortFr] = useState('');
  const [competenceItemId, setCompetenceItemId] = useState(competenceItems[0]?.id || '');

  const handleOpenAddSub = (subj: Subject) => {
    setSelectedSubjectForSub(subj);
    setCode(`${subj.code}-SUB`);
    setNameEn('');
    setNameFr('');
    setShortEn('');
    setShortFr('');
    setCompetenceItemId(subj.competence_item_id);
    setIsSubModalOpen(true);
  };

  const handleSaveSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubjectForSub) return;

    const newSub: SubSubject = {
      id: `sub-${Date.now()}`,
      subject_id: selectedSubjectForSub.id,
      school_id: 'school-gbhs-yaounde',
      competence_item_id: competenceItemId,
      code: code.toUpperCase(),
      name_en: nameEn,
      name_fr: nameFr,
      short_name_en: shortEn,
      short_name_fr: shortFr,
      order_index: subSubjects.filter(s => s.subject_id === selectedSubjectForSub.id).length + 1,
      is_active: true,
    };

    setSubSubjects([...subSubjects, newSub]);
    setSubjects(subjects.map(s => s.id === selectedSubjectForSub.id ? { ...s, has_sub_subjects: true } : s));
    setIsSubModalOpen(false);
  };

  const handleDeleteSub = (subId: string, subjectId: string) => {
    setSubSubjects(subSubjects.filter(s => s.id !== subId));
    const remaining = subSubjects.filter(s => s.subject_id === subjectId && s.id !== subId);
    if (remaining.length === 0) {
      setSubjects(subjects.map(s => s.id === subjectId ? { ...s, has_sub_subjects: false } : s));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Matières & Sous-Matières liés aux Éléments de Compétence' : 'Subjects & Sub-Subjects Linked to Competence Items'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Chaque matière ou sous-matière est rattachée à un élément de compétence précis.'
              : 'Every subject or sub-subject is linked to a precise competence item (e.g. English -> C1A, Math -> C2A).'}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {subjects.map(subj => {
          const ci = competenceItems.find(c => c.id === subj.competence_item_id);
          const subs = subSubjects.filter(s => s.subject_id === subj.id);

          return (
            <div key={subj.id} className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <span className="w-10 h-10 rounded-xl accent-green text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {subj.code}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold text-primary">{language === 'fr' ? subj.name_fr : subj.name_en}</h3>
                      {ci && (
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                          {ci.code}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-secondary mt-0.5">
                      {language === 'fr' ? `Compétence rattachée : ${ci?.name_fr}` : `Competence Item: ${ci?.name_en}`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenAddSub(subj)}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-secondary text-primary font-semibold text-xs border border-custom hover:bg-card cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'fr' ? 'Ajouter Sous-Matière' : 'Add Sub-Subject'}</span>
                </button>
              </div>

              {/* Sub-subjects list if any */}
              {subs.length > 0 && (
                <div className="pl-12 pt-3 border-t border-custom space-y-2">
                  <p className="text-[11px] font-semibold text-secondary uppercase tracking-wider">
                    {language === 'fr' ? 'Sous-matières incluses :' : 'Included Sub-Subjects:'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {subs.map(sub => {
                      const subCi = competenceItems.find(c => c.id === sub.competence_item_id);
                      return (
                        <div key={sub.id} className="bg-secondary p-3.5 rounded-xl border border-custom flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-[10px] font-bold text-amber-600">{sub.code}</span>
                              <span className="text-xs font-bold text-primary">{language === 'fr' ? sub.name_fr : sub.name_en}</span>
                            </div>
                            <p className="text-[10px] text-secondary">Linked Item: {subCi?.code}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteSub(sub.id, subj.id)}
                            className="p-1 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Sub-Subject Modal */}
      {isSubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl border border-custom p-6 shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-primary">
              {language === 'fr' ? 'Ajouter une Sous-Matière pour' : 'Add Sub-Subject for'} {selectedSubjectForSub?.name_en}
            </h3>

            <form onSubmit={handleSaveSub} className="space-y-4">
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Short Name (En)</label>
                  <input
                    type="text"
                    required
                    value={shortEn}
                    onChange={e => setShortEn(e.target.value)}
                    className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-medium text-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Abréviation (Fr)</label>
                  <input
                    type="text"
                    required
                    value={shortFr}
                    onChange={e => setShortFr(e.target.value)}
                    className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-medium text-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Competence Item Mapping / Élément de Compétence</label>
                <select
                  value={competenceItemId}
                  onChange={e => setCompetenceItemId(e.target.value)}
                  className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
                >
                  {competenceItems.map(ci => (
                    <option key={ci.id} value={ci.id}>
                      [{ci.code}] {language === 'fr' ? ci.name_fr : ci.name_en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-custom flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsSubModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-custom bg-secondary text-secondary font-semibold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl accent-green text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Save Sub-Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
