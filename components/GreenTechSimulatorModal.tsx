
import React, { useState, FormEvent, useRef } from 'react';
import ReactDOM from 'react-dom';
import { XMarkIcon, InformationCircleIcon } from './Icons'; // Added InformationCircleIcon

interface GreenTechSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

const GreenTechSimulatorModal: React.FC<GreenTechSimulatorModalProps> = ({ isOpen, onClose, projectTitle }) => {
  const [campaignName, setCampaignName] = useState('');
  const [destinations, setDestinations] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [numSent, setNumSent] = useState(0);
  const modalRootRef = useRef(document.getElementById('modal-root'));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const count = destinations.split(',').map(d => d.trim()).filter(d => d).length;
    setNumSent(count);
    setIsSubmitted(true);
  };

  const handleModalClose = () => {
    // Reset form and submission state before calling parent onClose
    setCampaignName('');
    setDestinations('');
    setMessage('');
    setIsSubmitted(false);
    setNumSent(0);
    onClose(); 
  };

  if (!isOpen || !modalRootRef.current) return null;

  return ReactDOM.createPortal(
    (
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-[100] p-2 sm:p-4"
        onClick={handleModalClose} 
        role="dialog"
        aria-modal="true"
        aria-labelledby="greentech-simulator-title"
      >
        <div 
          className="bg-slate-900 rounded-xl shadow-2xl shadow-green-500/20 border border-green-500/30 w-full max-w-md md:max-w-lg flex flex-col transform transition-all duration-300 ease-out scale-95 opacity-0 animate-modal-appear"
          onClick={(e) => e.stopPropagation()}
          style={{animationFillMode: 'forwards', animationName: 'modalAppear', animationDuration: '0.3s'}}
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
            <h2 id="greentech-simulator-title" className="text-lg sm:text-xl font-bold text-white">
              Simulação: <span className="text-green-400">{projectTitle}</span>
            </h2>
            <button 
              onClick={handleModalClose} 
              className="text-slate-400 hover:text-green-400 p-1 rounded-md transition-colors"
              aria-label="Fechar modal"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-grow">
              <div>
                <label htmlFor="campaignName" className="block text-sm font-medium text-slate-300 mb-1">
                  Nome da Campanha <span className="text-slate-500">(Opcional)</span>
                </label>
                <input
                  type="text"
                  id="campaignName"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Ex: Lançamento de Verão"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow text-sm"
                />
              </div>
              <div>
                <label htmlFor="destinations" className="block text-sm font-medium text-slate-300 mb-1">
                  Número(s) Destino <span className="text-slate-500">(separados por vírgula)</span>
                </label>
                <textarea
                  id="destinations"
                  value={destinations}
                  onChange={(e) => setDestinations(e.target.value)}
                  placeholder="+5511987654321, +5521912345678"
                  rows={3}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow text-sm custom-scrollbar"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
                  Sua Mensagem
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem aqui..."
                  rows={5}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow text-sm custom-scrollbar"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={!message.trim() || !destinations.trim()}
                className="w-full mt-2 p-3 font-semibold rounded-lg text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:shadow-cyan-500/30"
              >
                Enviar via Green-Tech (Simulado)
              </button>
            </form>
          ) : (
            <div className="p-6 text-center flex-grow flex flex-col justify-center items-center">
              <div className="bg-green-500/10 p-4 rounded-full mb-4 inline-block">
                  <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Envio Simulado com Sucesso!</h3>
              <p className="text-slate-300 mb-1">
                Sua mensagem para <strong className="text-green-400">{numSent}</strong> destinatário(s) foi "enviada".
              </p>
              {campaignName && <p className="text-slate-400 text-sm mb-4">Campanha: "{campaignName}"</p>}
              
              <div className="mt-4 p-4 bg-slate-800 rounded-lg text-sm text-left text-slate-400 w-full max-w-md">
                <div className="flex items-center mb-2">
                  <InformationCircleIcon className="w-5 h-5 text-cyan-400 mr-2 flex-shrink-0" />
                  <p className="font-semibold text-slate-200">Como isso funcionaria:</p>
                </div>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>A plataforma <strong className="text-green-400">Green-Tech</strong> coletaria esses dados.</li>
                  <li>Em seguida, faria uma requisição para a <strong className="text-cyan-400">WhatsApp API</strong> (o backend em Java).</li>
                  <li>A API validaria os dados e processaria o envio das mensagens através do serviço do WhatsApp.</li>
                </ol>
              </div>

              <button 
                onClick={handleModalClose}
                className="mt-6 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
              >
                Fechar Simulação
              </button>
            </div>
          )}
        </div>
      </div>
    ),
    modalRootRef.current
  );
};

export default GreenTechSimulatorModal;