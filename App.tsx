
import React from 'react';
import { Profile, Project, EducationItem, Skill, ProjectType } from './types';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutMeSection from './components/AboutMeSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import Footer from './components/Footer';
import AnimatedCodeBackground from './components/AnimatedCodeBackground'; // Import the new component
import { BriefcaseIcon, AcademicCapIcon, CodeBracketIcon, UserIcon, CpuChipIcon } from './components/Icons'; 

// Profile Data
const profileData: Profile = {
  name: "João Victor",
  tagline: "Desenvolvedor Full-Stack | Entusiasta de IA | Criador de Soluções Futuristas",
  bioSummary: "Sou um desenvolvedor apaixonado por tecnologia e inovação, sempre buscando novos desafios e aprendizados. Minha jornada é impulsionada pela curiosidade e pelo desejo de construir o futuro, um código de cada vez.",
  profilePictureUrl: "https://picsum.photos/seed/devprofile/300/300", 
  socialLinks: {
    github: "https://github.com/Joao848846",
    linkedin: "https://linkedin.com/in/seu-usuario", 
    email: "mailto:seuemail@example.com" 
  }
};

// Projects Data
const projectsData: Project[] = [
  {
    id: "proj-whatsappapi",
    title: "WhatsApp API",
    description: "Uma API robusta em Java para interagir com o WhatsApp, permitindo automatizar mensagens e outras funcionalidades. Realiza integração com outros serviços utilizando Docker para escalabilidade e deploy facilitado. Este é o backend que seria consumido pelo projeto Green Tech.",
    imageUrl: "https://picsum.photos/seed/whatsappapi/600/400",
    technologies: ["Java", "Spring Boot", "REST API", "Docker", "JWT"],
    repoUrl: "https://github.com/Joao848846/whatsappapi",
    projectUrl: "https://github.com/Joao848846/whatsappapi", 
    type: ProjectType.PERSONAL
  },
  {
    id: "proj-greentech",
    title: "Green Tech (Frontend WhatsApp API)",
    description: `Interface de frontend intuitiva (React, Tailwind CSS) para a **WhatsApp API**, com foco em usabilidade e design moderno. O Green Tech permite aos usuários:
    • **Criar Campanhas:** Organizar envios com nomes de campanhas.
    • **Múltiplos Destinatários:** Enviar mensagens para diversos números de forma prática.
    • **Composição de Mensagens:** Escrever e visualizar a mensagem a ser enviada.
    • **Simulação de Envio:** Testar a funcionalidade através de uma simulação interativa que demonstra o fluxo.

Este frontend se comunicaria com a **WhatsApp API** (backend em Java, Docker) via requisições HTTP para processar e disparar as mensagens. O projeto demonstra um fluxo completo, desde a interação do usuário na interface até a simulação da lógica de backend para automação de mensagens.`,
    imageUrl: "https://picsum.photos/seed/greentech/600/400",
    technologies: ["React", "TypeScript", "HTML", "Tailwind CSS", "REST Client"],
    repoUrl: "https://github.com/Joao848846/Green-Tech",
    projectUrl: "https://github.com/Joao848846/Green-Tech", 
    type: ProjectType.PERSONAL
  },
  {
    id: "proj-devtraining",
    title: "DevTraining",
    description: "Plataforma ou conjunto de recursos para treinamento e desenvolvimento. Ideal para aprender e aprimorar habilidades de programação através de exemplos práticos.",
    imageUrl: "https://picsum.photos/seed/devtraining/600/400",
    technologies: ["JavaScript", "React", "Node.js"], 
    repoUrl: "https://github.com/Joao848846/devtraining",
    projectUrl: "https://github.com/Joao848846/devtraining", 
    type: ProjectType.PERSONAL
  },
  {
    id: "proj-qacypress",
    title: "QA Cypress - Automação de Testes",
    description: "Projeto colaborativo focado na criação de testes automatizados com Cypress para mapeamento de funcionalidades frontend e backend, garantindo a qualidade e estabilidade da aplicação.",
    imageUrl: "https://picsum.photos/seed/qacypress/600/400",
    technologies: ["Cypress", "JavaScript", "Testes Automatizados", "QA"],
    repoUrl: "https://github.com/mkombr/qacypress",
    projectUrl: "https://github.com/mkombr/qacypress",
    type: ProjectType.COLLABORATIVE
  },
  {
    id: "proj-msgraph",
    title: "Integração Microsoft Graph (MKOM)",
    description: "Projeto colaborativo com a Microsoft para integrar os serviços da MKOM com o Microsoft Graph, permitindo acesso programático a dados e inteligência do Microsoft 365 para otimizar fluxos de trabalho e colaboração.",
    imageUrl: "https://picsum.photos/seed/msgraphintegration/600/400",
    technologies: ["Microsoft Graph API", "OAuth 2.0", "REST APIs", "Azure"],
    repoUrl: "https://github.com/Joao848846/Microsoft-Graph",
    projectUrl: "https://github.com/Joao848846/Microsoft-Graph",
    type: ProjectType.COLLABORATIVE
  }
];

const educationData: EducationItem[] = [
  {
    id: "edu1",
    institution: "Cruzeiro do Sul",
    degreeOrCertificate: "Bacharelado em Engenharia de Software com Ênfase em IA",
    fieldOfStudy: "Engenharia de Software e Inteligência Artificial",
    startDate: "2021",
    endDateOrExpected: "Cursando (Previsão 2028)",
    description: "Foco em desenvolvimento de sistemas inteligentes e arquiteturas de software escaláveis."
  },
  {
    id: "cert-nestjs",
    institution: "Udemy",
    degreeOrCertificate: "Certificado de Conclusão",
    fieldOfStudy: "NestJS do Zero com TypeORM, Mongoose, Prisma e Swagger",
    startDate: "2025",
    endDateOrExpected: "13/01/2025",
    description: "Concluído em 13/01/2025 (21.5h). Instrutor: Jorge Aluizio Alves de Souza. Certificado: ude.my/UC-6e0c0492-d696-4937-a96a-c4b940c849cb",
    certificateImageUrl: "https://picsum.photos/seed/cert-nestjs-img/420/594" // Placeholder, aspect ratio A4-like
  },
  {
    id: "cert-java",
    institution: "Udemy",
    degreeOrCertificate: "Certificado de Conclusão",
    fieldOfStudy: "Curso Java Completo e Atualizado do Iniciante ao Avançado",
    startDate: "2025",
    endDateOrExpected: "19/05/2025",
    description: "Concluído em 19/05/2025 (22h). Instrutor: Dougllas Sousa. Certificado: ude.my/UC-acd54676-2414-44aa-a2f6-01321af68532",
    certificateImageUrl: "https://picsum.photos/seed/cert-java-img/420/594" // Placeholder
  },
  {
    id: "cert-cypress-testes",
    institution: "Udemy",
    degreeOrCertificate: "Certificado de Conclusão",
    fieldOfStudy: "Testes de aplicações modernas com Cypress",
    startDate: "2024",
    endDateOrExpected: "03/09/2024",
    description: "Concluído em 03/09/2024 (14.5h). Instrutor: Francisco Wagner Costa Aquino. Certificado: ude.my/UC-f2ac29a3-20ff-4ab3-868d-157acff1c783",
    certificateImageUrl: "https://picsum.photos/seed/cert-cypress-img/420/594" // Placeholder
  }
];

const skillsData: Skill[] = [
  { id: "skill1", name: "React / React Native", icon: <CodeBracketIcon className="w-6 h-6 mr-2" />, level: 5 },
  { id: "skill2", name: "Node.js / Express", icon: <CodeBracketIcon className="w-6 h-6 mr-2" />, level: 5 },
  { id: "skill-java", name: "Java / Spring Boot", icon: <CodeBracketIcon className="w-6 h-6 mr-2" />, level: 5 },
  { id: "skill-nestjs", name: "NestJS Framework", icon: <CodeBracketIcon className="w-6 h-6 mr-2" />, level: 4 },
  { id: "skill3", name: "TypeScript", icon: <CodeBracketIcon className="w-6 h-6 mr-2" />, level: 4 },
  { id: "skill-cypress-e2e", name: "Cypress (Testes E2E)", icon: <CodeBracketIcon className="w-6 h-6 mr-2" />, level: 4 },
  { id: "skill5", name: "Gemini API", icon: <CpuChipIcon className="w-6 h-6 mr-2" />, level: 4 },
  { id: "skill6", name: "SQL & NoSQL Databases", icon: <CodeBracketIcon className="w-6 h-6 mr-2" />, level: 4 },
  { id: "skill7", name: "Docker & Kubernetes", icon: <CodeBracketIcon className="w-6 h-6 mr-2" />, level: 3 },
  { id: "skill8", name: "UI/UX Design Principles", icon: <CodeBracketIcon className="w-6 h-6 mr-2" />, level: 3 },
];


const App: React.FC = () => {
  const navItems = [
    { label: 'Início', href: '#hero', icon: <UserIcon className="w-5 h-5 mr-2" /> },
    { label: 'Sobre Mim', href: '#about', icon: <UserIcon className="w-5 h-5 mr-2" /> },
    { label: 'Projetos', href: '#projects', icon: <BriefcaseIcon className="w-5 h-5 mr-2" /> },
    { label: 'Formação', href: '#education', icon: <AcademicCapIcon className="w-5 h-5 mr-2" /> },
    { label: 'Habilidades', href: '#skills', icon: <CpuChipIcon className="w-5 h-5 mr-2" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative">
      <AnimatedCodeBackground />
      <Header navItems={navItems} siteTitle={profileData.name} />
      <main className="flex-grow z-10"> {/* Ensure main content is above background */}
        <HeroSection profile={profileData} />
        <AboutMeSection bio={profileData.bioSummary} />
        <ProjectsSection projects={projectsData} />
        <EducationSection items={educationData} />
        <SkillsSection skills={skillsData} />
      </main>
      <Footer name={profileData.name} />
    </div>
  );
};

export default App;
