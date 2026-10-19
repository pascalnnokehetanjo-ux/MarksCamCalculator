import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, Plus, Users, Edit, Trash2 } from 'lucide-react';
import { SchoolClass } from '../../types/markscam';

export const ClassesTab: React.FC = () => {
  const { classes, setClasses, academicYears, language } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<SchoolClass | null>(null);
  
  const [nameEn, setNameEn] = useState('');
  const [nameFr, setNameFr] = useState('');
  const [level, setLevel] = useState('Form 1 / 6ème');
  const [section, setSection] = useState('Bilingual / Bilingue');
  const [capacity, setCapacity] = useState(55);

  const handleOpenAdd = () => {
    setEditingClass(null);
    setNameEn('');
    setNameFr('');
    setLevel('Form 1 / 6ème');
    setSection('Bilingual / Bilingue');
    setCapacity(55);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cls: SchoolClass) => {
    setEditingClass(cls);
    setNameEn(cls.name_en);
    setNameFr(cls.name_fr);
    setLevel(cls.level);
    setSection(cls.section);
    setCapacity(cls.capacity);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClass) {
      setClasses(classes.map(c => c.id === editingClass.id ? {
        ...c,
        name_en: nameEn,
        name_fr: nameFr,
        level,
        section,
        capacity: Number(capacity),
        updated_at: new Date().toISOString()
      } : c));
    } else {
      const newClass: SchoolClass = {
        id: `class-${Date.now()}`,
        school_id: 'school-gbhs-yaounde',
        academic_year_id: academicYears[0]?.id || 'ay-2025-2026',
        name_en: nameEn,
        name_fr: nameFr,
        level,
        section,
        capacity: Number(capacity),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setClasses([...classes, newClass]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm(language === 'fr' ? 'Êtes-vous sûr de vouloir supprimer cette classe ?' : 'Are you sure you want to delete this class?')) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <Layers className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Gestion des Classes & Sections' : 'Classes & Sections Management'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Configurez les niveaux, sections (anglophone, francophone, bilingue) et capacités.'
              : 'Configure class levels, sections (Anglophone, Francophone, Bilingual), and student capacity.'}
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl accent-green text-white font-bold text-xs shadow-md hover:opacity-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'fr' ? 'Ajouter une Classe' : 'Add Class'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(cls => (
          <div key={cls.id} className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                  {cls.section}
                </span>
                <span className="flex items-center text-xs text-secondary">
                  <Users className="w-3.5 h-3.5 mr-1" /> Max {cls.capacity}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-primary">{language === 'fr' ? cls.name_fr : cls.name_en}</h3>
                <p className="text-xs text-secondary mt-0.5">{cls.level}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-custom flex items-center justify-end space-x-2">
              <button
                onClick={() => handleOpenEdit(cls)}
                className="p-2 rounded-lg bg-secondary text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(cls.id)}
                className="p-2 rounded-lg bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 hover:opacity-80 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl border border-custom p-6 shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-primary">
              {editingClass ? (language === 'fr' ? 'Modifier la Classe' : 'Edit Class') : (language === 'fr' ? 'Ajouter une Classe' : 'Add New Class')}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Class Name (English)</label>
                <input
                  type="text"
                  required
                  value={nameEn}
                  onChange={e => setNameEn(e.target.value)}
                  className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-medium text-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Nom de la Classe (Français)</label>
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
                  <label className="block text-xs font-semibold text-primary mb-1">Level / Niveau</label>
                  <input
                    type="text"
                    required
                    value={level}
                    onChange={e => setLevel(e.target.value)}
                    className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-medium text-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">Capacity / Capacité</label>
                  <input
                    type="number"
                    required
                    value={capacity}
                    onChange={e => setCapacity(Number(e.target.value))}
                    className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-medium text-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1">Section</label>
                <input
                  type="text"
                  required
                  value={section}
                  onChange={e => setSection(e.target.value)}
                  className="w-full bg-secondary border border-custom rounded-xl px-4 py-2 text-xs font-medium text-primary focus:outline-none"
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
                  Save Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
