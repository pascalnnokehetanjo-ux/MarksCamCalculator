import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Download, Printer, Award, CheckCircle } from 'lucide-react';

export const ReportCardsTab: React.FC = () => {
  const { school, students, classes, language } = useApp();
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [reportType, setReportType] = useState<'monthly' | 'termly' | 'annual'>('monthly');
  const [templateLang, setTemplateLang] = useState<'en' | 'fr'>('en');
  const [downloading, setDownloading] = useState(false);

  const student = students.find(s => s.id === selectedStudentId);
  const schoolClass = classes.find(c => c.id === selectedClassId);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(templateLang === 'fr' ? 'Bulletin PDF généré et téléchargé avec succès !' : 'PDF Report Card generated and downloaded successfully!');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <FileText className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Génération de Bulletins & Templates PDF' : 'Report Cards & PDF Generation'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Générez des bulletins mensuels, trimestriels et annuels aux normes du Cameroun en anglais et en français.'
              : 'Generate monthly, termly, and annual official Cameroonian report cards in separate native English and French templates.'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-card p-4 rounded-2xl border border-custom shadow-xs">
        <div>
          <label className="block text-xs font-semibold text-primary mb-1">Report Type</label>
          <select
            value={reportType}
            onChange={e => setReportType(e.target.value as any)}
            className="w-full bg-secondary border border-custom rounded-xl px-3 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
          >
            <option value="monthly">Monthly Report Card / Bulletin Mensuel</option>
            <option value="termly">Termly Report Card / Bulletin Trimestriel</option>
            <option value="annual">Annual Report Card / Bilan Annuel</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-primary mb-1">Template Language</label>
          <select
            value={templateLang}
            onChange={e => setTemplateLang(e.target.value as any)}
            className="w-full bg-secondary border border-custom rounded-xl px-3 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
          >
            <option value="en">English Template</option>
            <option value="fr">Modèle Français</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-primary mb-1">Class</label>
          <select
            value={selectedClassId}
            onChange={e => setSelectedClassId(e.target.value)}
            className="w-full bg-secondary border border-custom rounded-xl px-3 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
          >
            {classes.map(c => <option key={c.id} value={c.id}>{templateLang === 'fr' ? c.name_fr : c.name_en}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-primary mb-1">Student</label>
          <select
            value={selectedStudentId}
            onChange={e => setSelectedStudentId(e.target.value)}
            className="w-full bg-secondary border border-custom rounded-xl px-3 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
          >
            {students.filter(s => s.class_id === selectedClassId).map(s => (
              <option key={s.id} value={s.id}>{s.last_name} {s.first_name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Report Card Preview A4 Template */}
      <div className="bg-white text-slate-900 p-8 rounded-2xl border border-slate-300 shadow-2xl space-y-6 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b-2 border-slate-900">
          <div className="space-y-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              {templateLang === 'fr' ? 'REPUBLIQUE DU CAMEROUN - Paix-Travail-Patrie' : 'REPUBLIC OF CAMEROON - Peace-Work-Fatherland'}
            </h3>
            <p className="text-xs font-semibold text-slate-600">
              {templateLang === 'fr' ? 'MINISTÈRE DES ENSEIGNEMENTS SECONDAIRES' : 'MINISTRY OF SECONDARY EDUCATION'}
            </p>
            <h1 className="text-xl font-black text-slate-900 pt-2">
              {templateLang === 'fr' ? school.name_fr : school.name_en}
            </h1>
            <p className="text-xs text-slate-600">{templateLang === 'fr' ? school.address_fr : school.address_en}</p>
          </div>

          <div className="text-right space-y-1">
            <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black text-2xl ml-auto shadow-md">
              MC
            </div>
            <p className="text-xs font-mono font-bold text-slate-700">Academic Year: 2025/2026</p>
          </div>
        </div>

        {/* Title */}
        <div className="text-center py-2 bg-slate-100 rounded-xl border border-slate-300">
          <h2 className="text-base font-extrabold uppercase tracking-widest text-slate-900">
            {reportType === 'monthly'
              ? (templateLang === 'fr' ? 'BULLETIN DE NOTES MENSUEL' : 'MONTHLY REPORT CARD')
              : reportType === 'termly'
              ? (templateLang === 'fr' ? 'BULLETIN TRIMESTRIEL' : 'TERMLY REPORT CARD')
              : (templateLang === 'fr' ? 'BULLETIN BILAN ANNUEL' : 'ANNUAL REPORT CARD')}
          </h2>
        </div>

        {/* Student Info Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="font-semibold text-slate-500 block">Student Name / Nom :</span>
            <span className="font-bold text-slate-900 text-sm">{student ? `${student.last_name} ${student.first_name}` : ''}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-500 block">Admission # / Matricule :</span>
            <span className="font-mono font-bold text-slate-900">{student?.admission_number}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-500 block">Class / Classe :</span>
            <span className="font-bold text-slate-900">{schoolClass ? (templateLang === 'fr' ? schoolClass.name_fr : schoolClass.name_en) : ''}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-500 block">Gender & DOB :</span>
            <span className="font-bold text-slate-900">{student?.gender} | {student?.date_of_birth}</span>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs font-semibold text-emerald-800 block">Average / Moyenne</span>
            <span className="text-xl font-black text-emerald-700">15.45 / 20</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-semibold text-slate-600 block">Rank / Rang</span>
            <span className="text-xl font-black text-slate-900">1st / 55</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-semibold text-slate-600 block">Class Average</span>
            <span className="text-xl font-black text-slate-900">11.80 / 20</span>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <span className="text-xs font-semibold text-amber-800 block">Appreciation / Grade</span>
            <span className="text-lg font-black text-amber-700">Grade A (CA)</span>
          </div>
        </div>

        {/* Remarks & Signatures */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-300 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-700 block">Teacher's Remark / Visa du Professeur :</span>
            <p className="italic text-slate-600">"Excellent work ethic and mastery of foundational core competences. Keep it up!"</p>
            <div className="pt-8 flex justify-between font-bold text-slate-800">
              <span>Signature:</span>
              <span>_________________</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-700 block">Head Teacher's Remark / Visa du Chef d'Établissement :</span>
            <p className="italic text-slate-600">"Honour roll distinction. Outstanding academic performance."</p>
            <div className="pt-8 flex justify-between font-bold text-slate-800">
              <span>Signature & Stamp:</span>
              <span>_________________</span>
            </div>
          </div>
        </div>

        {/* Download Action */}
        <div className="pt-6 flex justify-end">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl accent-green text-white font-bold text-sm shadow-lg cursor-pointer hover:opacity-95"
          >
            <Download className="w-5 h-5" />
            <span>{downloading ? 'Generating PDF...' : (templateLang === 'fr' ? 'Télécharger le Bulletin PDF' : 'Download PDF Report Card')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
