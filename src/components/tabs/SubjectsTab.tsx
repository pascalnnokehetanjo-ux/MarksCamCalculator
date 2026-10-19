import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Plus, Edit, Trash2, AlertCircle } from 'lucide-react';
import { Subject } from '../../types/markscam';
import { validateSubjectCode } from '../../utils/validators';

export const SubjectsTab: React.FC = () => {
  const { subjects, setSubjects, language } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const [code, setCode] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [nameFr, setNameFr] = useState('');
  const [shortEn, setShortEn] = useState('');
  const [shortFr, setShortFr] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingSubject(null);
    setCode('');
    setNameEn('');
    setNameFr('');
    setShortEn('');
    setShortFr('');
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (subj: Subject) => {
    setEditingSubject(subj);
    setCode(subj.code);
    setNameEn(subj.name_en);
    setNameFr(subj.name_fr);
    setShortEn(subj.short_name_en);
    setShortFr(subj.short_name_fr);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateSubjectCode(code, subjects, editingSubject?.id);
    if (!validation.isValid) {
      setErrorMessage(validation.errors[0]);
      return;
    }

    if (editingSubject) {
      setSubjects(subjects.map(s => s.id === editingSubject.id ? {
        ...s,
        code: code.toUpperCase(),
        name_en: nameEn,
        name_fr: nameFr,
        short_name_en: shortEn,
        short_name_fr: shortFr,
      } : s));
    } else {
      const newSubject: Subject = {
        id: `subj-${Date.now()}`,
        school_id: 'school-gbhs-yaounde',
        code: code.toUpperCase(),
        name_en: nameEn,
        name_fr: nameFr,
        short_name_en: shortEn,
        short_name_fr: shortFr,
        order_index: subjects.length + 1,
        is_active: true,
        has_sub_subjects: false,
      };
      setSubjects([...subjects, newSubject]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm(language === 'fr' ? 'Supprimer cette matière ?' : 'Delete this subject?')) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Matières & Sous-Matières' : 'Subjects & Sub-Subjects'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Gérez les matières avec des codes uniques et des libellés bilingues.'
              : 'Manage academic subjects with unique codes and independent English/French titles.'}
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl accent-green text-white font-bold text-xs shadow-md hover:opacity-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'fr' ? 'Ajouter une Matière' : 'Add Subject'}</span>
        </button>
      </div>

      <div className="bg-card rounded-2xl border border-custom shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-secondary border-b border-custom text-secondary font-bold uppercase tracking-wider">
                <th className="p-4">Code</th>
                <th className="p-4">{language === 'fr' ? 'Nom de la Matière (Anglais / Français)' : 'Subject Name (English / French)'}</th>
                <th className="p-4">{language === 'fr' ? 'Abréviation' : 'Short Name'}</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-custom">
              {subjects.map(subj => (
                <tr key={subj.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-primary">{subj.code}</td>
                  <td className="p-4">
                    <p className="font-semibold text-primary">{subj.name_en}</p>
                    <p className="text-[11px] text-secondary">{subj.name_fr}</p>
                  </td>
                  <td className="p-4 text-secondary">{subj.short_name_en} / {subj.short_name_fr}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(subj)}
                      className="p-1.5 rounded-lg bg-secondary text-secondary hover:text-primary cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(subj.id)}
                      className="p-1.5 rounded-lg bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 hover:opacity-80 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl border border-custom p-6 shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-primary">
              {editingSubject ? (language === 'fr' ? 'Modifier la Matière' : 'Edit Subject') : (language === 'fr' ? 'Ajouter une Matière' : 'Add Subject')}
            </h3>

            {errorMessage && (
              <div className="flex items-center space-x-2 p-3 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Subject Code / Code Matière</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-mono font-medium text-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Subject Name (English)</label>
                <input
                  type="text"
                  required
                  value={nameEn}
                  onChange={e => setNameEn(e.target.value)}
                  className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-medium text-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Nom de la Matière (Français)</label>
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
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
