import React, { useState, useEffect } from 'react';
import { EducationItem as EducationItemType } from '../types';
import { AcademicCapIcon, CalendarDaysIcon, EyeIcon } from './Icons';
import CertificateViewerModal from './CertificateViewerModal';

interface EducationItemProps {
  item: EducationItemType;
  index: number;
}

const EducationItem: React.FC<EducationItemProps> = ({ item, index }) => {
  const isLeftAligned = index % 2 === 0;
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [externalCertUrl, setExternalCertUrl] = useState<string | null>(null);

  useEffect(() => {
    if (item.description) {
      const match = item.description.match(/Certificado: (ude\.my\/[^\s]+)/);
      if (match && match[1]) {
        setExternalCertUrl(`https://${match[1]}`);
      } else {
        setExternalCertUrl(null);
      }
    } else {
      setExternalCertUrl(null);
    }
  }, [item.description]);

  const openViewer = () => {
    if (item.certificateImageUrl || externalCertUrl) {
      setIsViewerOpen(true);
    }
  };
  const closeViewer = () => setIsViewerOpen(false);

  const canViewCertificate = item.certificateImageUrl || externalCertUrl;

  return (
    <>
      <div className={`relative flex flex-col md:flex-row items-start ${isLeftAligned ? 'md:flex-row-reverse' : ''} w-full group`}> {/* Added group here for potential future use if dot needs to react */}
        {/* Connector Dot (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-slate-700 rounded-full border-2 border-cyan-500 shadow-md shadow-cyan-500/50 z-10">
          <div className="w-full h-full bg-cyan-500 rounded-full scale-50 group-hover:scale-100 transition-transform"></div>
        </div>
        
        {/* Spacer for Desktop Timeline Alignment */}
        <div className="hidden md:block w-1/2"></div>
        
        {/* Content Card */}
        <div className={`w-full md:w-1/2 p-1 ${isLeftAligned ? 'md:pr-8' : 'md:pl-8'} `}>
          <div className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-slate-700/50 hover:border-cyan-500/70 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30">
            <div className="flex items-center mb-3">
              <AcademicCapIcon className="w-8 h-8 text-cyan-400 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white">{item.degreeOrCertificate}</h3>
                <p className="text-md text-purple-400">{item.institution}</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-1 italic">{item.fieldOfStudy}</p>
            <div className="flex items-center text-xs text-slate-500 mb-3">
              <CalendarDaysIcon className="w-4 h-4 mr-2" />
              <span>{item.startDate} - {item.endDateOrExpected}</span>
            </div>
            {item.description && (
              <p className="text-sm text-slate-300 leading-relaxed mb-3 whitespace-pre-line">{item.description.split('Certificado:')[0].trim()}</p>
            )}
            {canViewCertificate && (
              <button
                onClick={openViewer}
                className="mt-2 inline-flex items-center text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors group/link"
                aria-label={`Visualizar certificado: ${item.fieldOfStudy}`}
              >
                <EyeIcon className="w-4 h-4 mr-1.5" /> Visualizar Certificado
              </button>
            )}
          </div>
        </div>
      </div>
      {canViewCertificate && (
        <CertificateViewerModal
          isOpen={isViewerOpen}
          onClose={closeViewer}
          imageUrl={item.certificateImageUrl} 
          externalCertificateUrl={externalCertUrl ?? undefined} 
          certificateTitle={item.fieldOfStudy}
        />
      )}
    </>
  );
};

export default EducationItem;