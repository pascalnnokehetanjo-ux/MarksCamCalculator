import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Camera, Upload, FileImage, CheckCircle, Clock, AlertCircle, ArrowRight, Trash2 } from 'lucide-react';
import { MarksheetPhoto } from '../../types/markscam';
import { simulateOcrExtraction } from '../../utils/ocrService';

export const OcrUploadTab: React.FC<{ onSelectPhoto: (photo: MarksheetPhoto) => void }> = ({ onSelectPhoto }) => {
  const { classes, months, subjects, evaluationTypes, students, language } = useApp();
  
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [selectedMonthId, setSelectedMonthId] = useState(months[0]?.id || '');
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || '');
  const [selectedEvalId, setSelectedEvalId] = useState(evaluationTypes[1]?.id || ''); // Written by default

  // Photos state
  const [photos, setPhotos] = useState<MarksheetPhoto[]>([
    {
      id: 'photo-001',
      school_id: 'school-gbhs-yaounde',
      academic_year_id: 'ay-2025-2026',
      term_id: 'term-1',
      month_id: months[0]?.id || 'm-sep',
      class_id: classes[0]?.id || 'class-form1-bil',
      subject_id: subjects[0]?.id || 'subj-eng',
      evaluation_type_id: evaluationTypes[1]?.id || 'et-written',
      uploaded_by: 'user-admin-1',
      original_file_path: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&auto=format&fit=crop&q=80',
      file_name: 'Form1_English_Written_Sep.jpg',
      file_size: 1048576,
      mime_type: 'image/jpeg',
      page_number: 1,
      total_pages: 1,
      status: 'extracted',
      ocr_provider: 'Google Cloud Vision / Tesseract v5',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ]);

  const handleUploadMock = () => {
    const newPhoto: MarksheetPhoto = {
      id: `photo-${Date.now()}`,
      school_id: 'school-gbhs-yaounde',
      academic_year_id: 'ay-2025-2026',
      term_id: 'term-1',
      month_id: selectedMonthId,
      class_id: selectedClassId,
      subject_id: selectedSubjectId,
      evaluation_type_id: selectedEvalId,
      uploaded_by: 'user-admin-1',
      original_file_path: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80',
      file_name: `Marksheet_${selectedSubjectId}_${Date.now()}.jpg`,
      file_size: 2048500,
      mime_type: 'image/jpeg',
      page_number: 1,
      total_pages: 1,
      status: 'extracted',
      ocr_provider: 'Google Cloud Vision / Tesseract v5',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setPhotos([newPhoto, ...photos]);
  };

  const handleDelete = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div>
          <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
            <Camera className="w-6 h-6 text-emerald-600" />
            <span>{language === 'fr' ? 'Téléversement de Photos de Relevés & OCR' : 'Marksheet Photo Upload & OCR Pipeline'}</span>
          </h2>
          <p className="text-xs text-secondary mt-1">
            {language === 'fr'
              ? 'Téléversez des photos de feuilles de notes (JPEG, PNG, WebP) pour l\'extraction OCR structurée.'
              : 'Upload marksheet photos for automated OCR table extraction and teacher verification.'}
          </p>
        </div>
      </div>

      {/* Upload Box & Selectors */}
      <div className="bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Class / Classe</label>
            <select
              value={selectedClassId}
              onChange={e => setSelectedClassId(e.target.value)}
              className="w-full bg-secondary border border-custom rounded-xl px-3 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
            >
              {classes.map(c => <option key={c.id} value={c.id}>{language === 'fr' ? c.name_fr : c.name_en}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Month / Mois</label>
            <select
              value={selectedMonthId}
              onChange={e => setSelectedMonthId(e.target.value)}
              className="w-full bg-secondary border border-custom rounded-xl px-3 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
            >
              {months.map(m => <option key={m.id} value={m.id}>{language === 'fr' ? m.name_fr : m.name_en}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Subject / Matière</label>
            <select
              value={selectedSubjectId}
              onChange={e => setSelectedSubjectId(e.target.value)}
              className="w-full bg-secondary border border-custom rounded-xl px-3 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
            >
              {subjects.map(s => <option key={s.id} value={s.id}>[{s.code}] {language === 'fr' ? s.name_fr : s.name_en}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Evaluation Type</label>
            <select
              value={selectedEvalId}
              onChange={e => setSelectedEvalId(e.target.value)}
              className="w-full bg-secondary border border-custom rounded-xl px-3 py-2 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
            >
              {evaluationTypes.map(et => <option key={et.id} value={et.id}>{language === 'fr' ? et.name_fr : et.name_en}</option>)}
            </select>
          </div>
        </div>

        <div className="border-2 border-dashed border-custom rounded-2xl p-8 text-center bg-secondary/50 space-y-4">
          <div className="w-12 h-12 rounded-2xl accent-green text-white flex items-center justify-center mx-auto shadow-md">
            <Upload className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-primary">
              {language === 'fr' ? 'Glissez-déposez vos photos de notes ici, ou' : 'Drag & drop marksheet photos here, or'}
            </p>
            <p className="text-xs text-secondary">Supports JPEG, PNG, WebP up to 15MB</p>
          </div>
          <button
            onClick={handleUploadMock}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl accent-green text-white font-bold text-xs shadow-md cursor-pointer hover:opacity-95"
          >
            <Camera className="w-4 h-4" />
            <span>{language === 'fr' ? 'Sélectionner des Photos / Capturer' : 'Select Photos / Camera Capture'}</span>
          </button>
        </div>
      </div>

      {/* Photos List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
          {language === 'fr' ? 'Photos Téléversées & Traitées par OCR' : 'Uploaded Photos & OCR Queue'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {photos.map(photo => {
            const subj = subjects.find(s => s.id === photo.subject_id);

            return (
              <div key={photo.id} className="bg-card p-5 rounded-2xl border border-custom shadow-xs flex items-start space-x-4">
                <img
                  src={photo.original_file_path}
                  alt={photo.file_name}
                  className="w-24 h-28 object-cover rounded-xl border border-custom shrink-0"
                />

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 uppercase">
                      {photo.status}
                    </span>
                    <button
                      onClick={() => handleDelete(photo.id)}
                      className="p-1 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-primary truncate">{photo.file_name}</h4>
                    <p className="text-[11px] text-secondary">Subject: {subj?.name_en || 'General'}</p>
                    <p className="text-[10px] font-mono text-secondary mt-1">{photo.ocr_provider}</p>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onSelectPhoto(photo)}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg accent-green text-white font-bold text-xs shadow-sm cursor-pointer hover:opacity-95"
                    >
                      <span>{language === 'fr' ? 'Vérifier l\'Extraction OCR' : 'Verify OCR Extraction'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
