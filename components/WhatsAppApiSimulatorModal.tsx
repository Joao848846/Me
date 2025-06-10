
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import ReactDOM from 'react-dom';
import { ChatMessage } from '../types';
import { PaperAirplaneIcon, XMarkIcon } from './Icons';

interface WhatsAppApiSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

type ChatState = 'initial' | 'awaiting_option' | 'awaiting_number' | 'awaiting_message_content' | 'simulating' | 'info_given' | 'simulation_done';

const WhatsAppApiSimulatorModal: React.FC<WhatsAppApiSimulatorModalProps> = ({ isOpen, onClose, projectTitle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [chatState, setChatState] = useState<ChatState>('initial');
  const [tempData, setTempData] = useState<{ phoneNumber?: string; messageContent?: string }>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modalRootRef = useRef(document.getElementById('modal-root'));


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const addMessage = (text: string, sender: 'user' | 'system', metadata?: Record<string, any>) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), text, sender, timestamp: new Date(), metadata }]);
  };

  const handleSystemResponse = (delay: number = 500) => {
    setTimeout(() => {
      processSystemLogic();
    }, delay);
  };
  
  useEffect(() => {
    if (isOpen && chatState === 'initial') {
      setMessages([]); // Clear previous messages when modal opens
      setTempData({});
      addMessage(
        `Olá! 👋 Bem-vindo à demonstração interativa da ${projectTitle}.\nEu posso te mostrar como uma mensagem seria enviada ou explicar um pouco mais sobre como o serviço funciona.\n\nO que você gostaria de fazer?\n1. Simular envio de mensagem\n2. Saber mais sobre a API`,
        'system'
      );
      setChatState('awaiting_option');
    }
  }, [isOpen, projectTitle]);


  const processSystemLogic = () => {
    switch (chatState) {
      case 'awaiting_number':
        addMessage("Ótimo! Para simular o envio, preciso de algumas informações.\nPor favor, digite o número de telefone de destino (ex: +55 11 91234-5678).", 'system');
        break;
      case 'awaiting_message_content':
        addMessage(`Entendido: ${tempData.phoneNumber}.\nAgora, qual mensagem você gostaria de enviar?`, 'system');
        break;
      case 'simulating':
        addMessage(`Perfeito! Estou simulando o envio da mensagem:\n  Para: ${tempData.phoneNumber}\n  Conteúdo: '${tempData.messageContent}'\n\nAguarde um instante...`, 'system');
        setTimeout(() => {
            const simResponse = {
                messageId: `sim_id_${Date.now()}`,
                status: `SENT_SUCCESS_SIMULATED`,
                to: tempData.phoneNumber,
                contentLength: tempData.messageContent?.length || 0,
            };
            addMessage(
              `🚀 **Simulação Concluída!**\nSua mensagem foi 'enviada' com sucesso.\n\n**Detalhes da Simulação (JSON):** \n\`\`\`json\n${JSON.stringify(simResponse, null, 2)}\n\`\`\` \n\nÉ assim que uma aplicação backend (como a nossa API Java) interage com o serviço para disparar mensagens. O frontend (como o Green Tech) consumiria essa API para oferecer a funcionalidade ao usuário final.`, 
              'system',
              { jsonResponse: simResponse }
            );
            addMessage("Gostaria de tentar novamente (digite 'simular') ou saber mais sobre a API (digite 'sobre')?", 'system');
            setChatState('simulation_done');
        }, 2000);
        break;
      case 'info_given':
        addMessage(
            `Claro! A **${projectTitle}** é um serviço backend construído em **Java** e utiliza **Docker** para facilitar a implantação e escalabilidade.\n\nEla permite que outras aplicações enviem e, potencialmente, recebam mensagens do WhatsApp de forma programática. Isso é muito útil para:\n*   Notificações automáticas (confirmação de compra, lembretes)\n*   Atendimento ao cliente via chatbots ou agentes\n*   Integrações com CRMs e outros sistemas.`,
            'system'
        );
        addMessage(
            `O projeto **Green-Tech**, por exemplo, é um frontend em **React** que poderia consumir esta API para permitir que usuários enviem mensagens através de uma interface web amigável.\n\nA comunicação entre o frontend e esta API normalmente ocorreria via requisições HTTP (RESTful).`,
            'system'
        );
        addMessage("Gostaria de simular o envio de uma mensagem agora (digite 'simular')?", 'system');
        setChatState('awaiting_option'); // Go back to allowing simulation
        break;
    }
  };


  const handleUserInput = () => {
    const userText = inputText.trim().toLowerCase();
    if (!userText) return;

    addMessage(inputText, 'user');
    setInputText('');

    switch (chatState) {
      case 'awaiting_option':
      case 'simulation_done': // Also allow new commands after simulation
        if (userText.includes('1') || userText.includes('simular') || userText.includes('enviar')) {
          setChatState('awaiting_number');
        } else if (userText.includes('2') || userText.includes('saber') || userText.includes('sobre') || userText.includes('api')) {
          setChatState('info_given');
        } else {
          addMessage("Desculpe, não entendi. Você pode digitar '1' ou 'simular' para testar o envio, ou '2' ou 'sobre' para saber mais.", 'system');
          setChatState('awaiting_option'); // Stay in this state
          return; // Don't trigger generic system response
        }
        break;
      case 'awaiting_number':
        // Basic validation for phone number (example)
        if (/^\+?[0-9\s-()]{7,}$/.test(userText)) {
          setTempData({ ...tempData, phoneNumber: userText });
          setChatState('awaiting_message_content');
        } else {
          addMessage("Parece que isso não é um número de telefone válido. Por favor, tente novamente (ex: +55 11 91234-5678).", 'system');
           return; 
        }
        break;
      case 'awaiting_message_content':
        setTempData({ ...tempData, messageContent: inputText }); // Use original inputText for casing
        setChatState('simulating');
        break;
      default:
        addMessage("Ainda estou processando a etapa anterior. Um momento...", 'system');
        return; 
    }
    handleSystemResponse();
  };
  
  useEffect(() => {
    // This allows the initial system message of a new state to be sent
    // if the state was changed directly by user input processing.
    if (['awaiting_number', 'awaiting_message_content', 'simulating', 'info_given'].includes(chatState) && messages[messages.length -1]?.sender === 'user') {
         processSystemLogic();
    }
  }, [chatState, messages]);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleUserInput();
  };

  if (!isOpen || !modalRootRef.current) return null;

  return ReactDOM.createPortal(
    (
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-[100] p-2 sm:p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="simulator-title"
      >
        <div 
          className="bg-slate-900 rounded-xl shadow-2xl shadow-cyan-500/20 border border-cyan-500/30 w-full max-w-md md:max-w-lg h-[90vh] md:h-[80vh] flex flex-col transform transition-all duration-300 ease-out scale-95 opacity-0 animate-modal-appear"
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
              .chat-message-text p { margin-bottom: 0.5rem; }
              .chat-message-text p:last-child { margin-bottom: 0; }
              .chat-message-text strong { color: #22d3ee; } /* cyan-400 */
              .chat-message-text code { 
                font-family: monospace;
                background-color: #1e293b; /* slate-800 */
                padding: 0.1rem 0.3rem;
                border-radius: 0.25rem;
                font-size: 0.875em;
              }
              .chat-message-text pre code {
                display: block;
                padding: 0.5rem;
                overflow-x: auto;
              }
            `}
          </style>
          <div className="flex justify-between items-center p-4 border-b border-slate-700/50">
            <h2 id="simulator-title" className="text-lg sm:text-xl font-bold text-white">
              Simulador: <span className="text-cyan-400">{projectTitle}</span>
            </h2>
            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-cyan-400 p-1 rounded-md transition-colors"
              aria-label="Fechar modal"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-xl shadow ${
                    msg.sender === 'user' 
                      ? 'bg-cyan-600 text-white rounded-br-none' 
                      : 'bg-slate-700 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <div 
                      className="chat-message-text text-sm whitespace-pre-wrap" 
                      dangerouslySetInnerHTML={{ __html: msg.text.replace(/```json\n([\s\S]*?)\n```/g, '<pre class="custom-scrollbar"><code>$1</code></pre>').replace(/\n/g, '<br />') }}
                  />
                  <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-cyan-200' : 'text-slate-400'} text-right`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700/50 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-grow bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-shadow text-sm"
              disabled={chatState === 'simulating' || chatState === 'initial'}
            />
            <button 
              type="submit"
              disabled={!inputText.trim() || chatState === 'simulating' || chatState === 'initial'}
              className="p-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Enviar mensagem"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    ),
    modalRootRef.current
  );
};

export default WhatsAppApiSimulatorModal;