import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Save, Check } from 'lucide-react';

export const SchoolProfileTab: React.FC = () => {
  const { school, setSchool, language } = useApp();
  const [formData, setFormData] = useState(school);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSchool({ ...formData, updated_at: new Date().toISOString() });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Profil de l\'Établissement' : language === 'ha' ? 'Bayanin Makaranta' : 'School Profile & Multi-Tenancy'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Configurez les informations officielles en anglais et en français pour votre établissement au Cameroun.'
              : language === 'ha'
              ? 'Saita bayanan hukuma na makarantarka cikin Turanci da Faransanci.'
              : 'Configure official English and French details for your Cameroonian educational institution.'}
          </p>
        </div>
        {savedMessage && (
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold shadow-xs">
            <Check className="w-4 h-4" />
            <span>{language === 'fr' ? 'Enregistré avec succès !' : 'Saved successfully!'}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label className="block text-xs font-semibold text-primary mb-1.5">
              {language === 'fr' ? 'Nom de l\'École (Anglais)' : 'School Name (English)'}
            </label>
            <input
              type="text"
              required
              value={formData.name_en}
              onChange={e => setFormData({ ...formData, name_en: e.target.value })}
              className="w-full bg-secondary border border-custom rounded-xl px-4 py-2.5 text-xs font-medium text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1.5">
              {language === 'fr' ? 'Nom de l\'École (Français)' : 'School Name (French)'}
            </label>
            <input
              type="text"
              required
              value={formData.name_fr}
              onChange={e => setFormData({ ...formData, name_fr: e.target.value })}
              className="w-full bg-secondary border border-custom rounded-xl px-4 py-2.5 text-xs font-medium text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1.5">
              {language === 'fr' ? 'Adresse (Anglais)' : 'Address (English)'}
            </label>
            <textarea
              rows={3}
              value={formData.address_en}
              onChange={e => setFormData({ ...formData, address_en: e.target.value })}
              className="w-full bg-secondary border border-custom rounded-xl p-3 text-xs font-medium text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1.5">
              {language === 'fr' ? 'Adresse (Français)' : 'Address (French)'}
            </label>
            <textarea
              rows={3}
              value={formData.address_fr}
              onChange={e => setFormData({ ...formData, address_fr: e.target.value })}
              className="w-full bg-secondary border border-custom rounded-xl p-3 text-xs font-medium text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1.5">Telephone / Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-secondary border border-custom rounded-xl px-4 py-2.5 text-xs font-medium text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1.5">Official Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-secondary border border-custom rounded-xl px-4 py-2.5 text-xs font-medium text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

        </div>

        <div className="pt-4 border-t border-custom flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl accent-green text-white font-bold text-xs shadow-md hover:opacity-95 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{language === 'fr' ? 'Enregistrer les Modifications' : 'Save School Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
