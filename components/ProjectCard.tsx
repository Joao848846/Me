import React, { useState } from 'react';
import { Project } from '../types';
import { ExternalLinkIcon, GithubIconSolid, TerminalIcon, ChatBubbleLeftRightIcon } from './Icons';
import WhatsAppApiSimulatorModal from './WhatsAppApiSimulatorModal';
import GreenTechSimulatorModal from './GreenTechSimulatorModal'; // Import the new modal

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isWhatsAppSimulatorOpen, setIsWhatsAppSimulatorOpen] = useState(false);
  const [isGreenTechSimulatorOpen, setIsGreenTechSimulatorOpen] = useState(false);

  const openWhatsAppSimulator = () => setIsWhatsAppSimulatorOpen(true);
  const closeWhatsAppSimulator = () => setIsWhatsAppSimulatorOpen(false);

  const openGreenTechSimulator = () => setIsGreenTechSimulatorOpen(true);
  const closeGreenTechSimulator = () => setIsGreenTechSimulatorOpen(false);

  return (
    <>
      <div className="group relative bg-slate-900 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:shadow-cyan-500/50 border border-slate-800 group-hover:border-cyan-500/50 transform group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-1 w-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110" /* Image scales slightly more */
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <span className="absolute top-4 right-4 bg-cyan-500 text-slate-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            {project.type}
          </span>
        </div>
        
        <div className="p-6 relative z-10 flex-grow flex flex-col">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">{project.title}</h3>
          <p className="text-slate-400 text-sm mb-4 h-16 overflow-y-auto custom-scrollbar leading-relaxed">
            {project.description}
          </p>
          
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tecnologias:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-2.5 py-1 text-xs font-medium bg-slate-800 text-cyan-400 rounded-full border border-slate-700 group-hover:border-cyan-600/50 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-start gap-x-4 gap-y-2 pt-4 border-t border-slate-800/70 group-hover:border-cyan-500/30 transition-colors mt-auto">
            {project.projectUrl && (
              <a 
                href={project.projectUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors group/link"
                aria-label={`Ver projeto ${project.title}`}
              >
                Ver Projeto <ExternalLinkIcon className="w-4 h-4 ml-1.5 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            )}
            {project.repoUrl && (
               <a 
                href={project.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-slate-400 hover:text-slate-300 font-medium transition-colors group/link"
                aria-label={`Ver repositório do projeto ${project.title}`}
              >
                <GithubIconSolid className="w-4 h-4 mr-1.5" /> Repositório
              </a>
            )}
            {project.id === 'proj-whatsappapi' && (
              <button
                onClick={openWhatsAppSimulator}
                className="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors group/link"
                aria-label={`Testar API do projeto ${project.title} (Simulação)`}
              >
                <TerminalIcon className="w-4 h-4 mr-1.5" /> Testar API (Simulação)
              </button>
            )}
            {project.id === 'proj-greentech' && (
              <button
                onClick={openGreenTechSimulator}
                className="inline-flex items-center text-sm text-green-400 hover:text-green-300 font-medium transition-colors group/link"
                aria-label={`Simular interface do projeto ${project.title}`}
              >
                <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1.5" /> Simular Interface
              </button>
            )}
          </div>
        </div>
      </div>
      {project.id === 'proj-whatsappapi' && (
        <WhatsAppApiSimulatorModal
          isOpen={isWhatsAppSimulatorOpen}
          onClose={closeWhatsAppSimulator}
          projectTitle={project.title}
        />
      )}
      {project.id === 'proj-greentech' && (
        <GreenTechSimulatorModal
          isOpen={isGreenTechSimulatorOpen}
          onClose={closeGreenTechSimulator}
          projectTitle={project.title}
        />
      )}
    </>
  );
};

export default ProjectCard;