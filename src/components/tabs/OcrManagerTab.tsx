import React, { useState } from 'react';
import { MarksheetPhoto } from '../../types/markscam';
import { OcrUploadTab } from './OcrUploadTab';
import { OcrVerificationTab } from './OcrVerificationTab';

export const OcrManagerTab: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<MarksheetPhoto | null>(null);

  if (activePhoto) {
    return <OcrVerificationTab photo={activePhoto} onBack={() => setActivePhoto(null)} />;
  }

  return <OcrUploadTab onSelectPhoto={photo => setActivePhoto(photo)} />;
};
