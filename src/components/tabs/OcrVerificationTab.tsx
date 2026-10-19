import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertTriangle, ArrowLeft, Save, ShieldCheck } from 'lucide-react';
import { MarksheetPhoto, OcrExtraction } from '../../types/markscam';
import { simulateOcrExtraction, transferOcrToStudentMarks } from '../../utils/ocrService';

export const OcrVerificationTab: React.FC<{ photo: MarksheetPhoto; onBack: () => void }> = ({ photo, onBack }) => {
  const { students, language, setStudents } = useApp();
  const [extractions, setExtractions] = useState<OcrExtraction[]>(() => simulateOcrExtraction(photo, students));
  const [successMsg, setSuccessMsg] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const handleTextChange = (id: string, newText: string) => {
    setExtractions(extractions.map(e => e.id === id ? { ...e, normalized_text: newText, match_status: 'matched' } : e));
  };

  const handleApproveAndTransfer = () => {
    setIsApproved(true);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between pb-4 border-b border-custom">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-secondary text-secondary hover:text-primary cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-primary flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <span>{language === 'fr' ? 'Espace de Vérification OCR' : 'OCR Verification Workspace'}</span>
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              Review and verify extracted table values. AI never writes directly to final student marks without review.
            </p>
          </div>
        </div>

        {successMsg && (
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold shadow-xs">
            <CheckCircle className="w-4 h-4" />
            <span>{language === 'fr' ? 'Approuvé et transféré aux notes provisoires !' : 'Approved & Transferred to draft marks!'}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Original Photo Preview */}
        <div className="lg:col-span-5 bg-card p-4 rounded-2xl border border-custom shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-primary uppercase tracking-wider">Original Marksheet Photo</h3>
          <div className="rounded-xl overflow-hidden border border-custom bg-black/5">
            <img
              src={photo.original_file_path}
              alt="Marksheet Scan"
              className="w-full h-96 object-cover hover:scale-105 transition-transform cursor-zoom-in"
            />
          </div>
          <p className="text-[11px] text-secondary">
            File: {photo.file_name} ({Math.round(photo.file_size / 1024)} KB)
          </p>
        </div>

        {/* Right: Extracted Table Cells */}
        <div className="lg:col-span-7 bg-card p-6 rounded-2xl border border-custom shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
              {language === 'fr' ? 'Tableau Extrait par OCR & Validation' : 'Extracted Table Cells & Review'}
            </h3>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
              isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {isApproved ? 'Approved & Transferred' : 'Pending Verification'}
            </span>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {extractions.map(ext => {
              const isLowConfidence = ext.confidence < 85;

              return (
                <div key={ext.id} className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 ${
                  isLowConfidence
                    ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
                    : 'bg-secondary border-custom'
                }`}>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] font-bold text-secondary uppercase">Row {ext.row_index + 1} ({ext.cell_type})</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isLowConfidence ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'
                      }`}>
                        Confidence: {ext.confidence}%
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-secondary">Raw OCR: <strong className="font-mono text-primary">{ext.raw_text}</strong></span>
                    </div>
                  </div>

                  <div className="w-32">
                    <input
                      type="text"
                      value={ext.normalized_text}
                      onChange={e => handleTextChange(ext.id, e.target.value)}
                      className="w-full bg-card border border-custom rounded-lg px-3 py-1.5 font-mono text-xs font-bold text-primary focus:outline-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-custom flex justify-end">
            <button
              onClick={handleApproveAndTransfer}
              disabled={isApproved}
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-white font-bold text-xs shadow-md ${
                isApproved ? 'bg-slate-400 cursor-not-allowed' : 'accent-green cursor-pointer hover:opacity-95'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isApproved ? 'Approved & Transferred' : (language === 'fr' ? 'Approuver et Transférer aux Notes' : 'Approve & Transfer to Draft Marks')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
