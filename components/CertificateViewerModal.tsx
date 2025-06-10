
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { XMarkIcon } from './Icons';


interface CertificateViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string; 
  externalCertificateUrl?: string; 
  certificateTitle: string;
}

const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({ 
  isOpen, 
  onClose, 
  imageUrl,
  externalCertificateUrl,
  certificateTitle
}) => {
  const modalRootRef = useRef(document.getElementById('modal-root'));

  if (!isOpen || !modalRootRef.current) return null;

  return ReactDOM.createPortal(
    (
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-[100] p-2 sm:p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-viewer-title"
      >
        <div
          className="bg-slate-900 rounded-xl shadow-2xl shadow-purple-500/20 border border-purple-500/30 w-full max-w-3xl h-[90vh] flex flex-col transform transition-all duration-300 ease-out scale-95 opacity-0 animate-modal-appear"
          onClick={(e) => e.stopPropagation()}
          style={{ animationFillMode: 'forwards', animationName: 'modalAppear', animationDuration: '0.3s' }}
        >
          <style>
            {`
              @keyframes modalAppear {
                to {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            `}
          </style>
          <div className="flex justify-between items-center p-4 border-b border-slate-700/50">
            <h2 id="certificate-viewer-title" className="text-lg sm:text-xl font-bold text-white truncate" title={certificateTitle}>
              Certificado: <span className="text-purple-400">{certificateTitle}</span>
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-purple-400 p-1 rounded-md transition-colors"
              aria-label="Fechar modal"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-grow p-1 md:p-2 bg-slate-800 flex items-center justify-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`Certificado: ${certificateTitle}`}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <p className="p-4 text-slate-300 text-center">
                Pré-visualização da imagem do certificado não disponível.
              </p>
            )}
          </div>
          <div className="p-3 border-t border-slate-700/50 text-center">
              {externalCertificateUrl ? (
                <a 
                    href={externalCertificateUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    Abrir certificado original em nova aba
                </a>
              ) : (
                <span className="text-sm text-slate-500">Link para certificado original não disponível.</span>
              )}
          </div>
        </div>
      </div>
    ),
    modalRootRef.current
  );
};

export default CertificateViewerModal;