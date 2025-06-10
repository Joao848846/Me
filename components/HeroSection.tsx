import React from 'react';
import { Profile } from '../types';
import { GithubIcon, LinkedinIcon, MailIcon } from './Icons'; // Assuming Icons.tsx

interface HeroSectionProps {
  profile: Profile;
}

const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950 pt-20">
      {/* Background Glows / Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/30 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full filter blur-3xl opacity-50 animate-pulse-slower"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="relative inline-block mb-8 group">
          <img
            src={profile.profilePictureUrl}
            alt={profile.name}
            className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-cyan-500/50 shadow-2xl shadow-cyan-500/30 transition-all duration-500 group-hover:border-cyan-400 group-hover:shadow-cyan-400/50"
          />
          <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-purple-500 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4">
          <span className="block text-white leading-tight">{profile.name.split(' ')[0]}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 leading-tight">{profile.name.split(' ').slice(1).join(' ')}</span>
        </h1>
        
        <p className="text-lg sm:text-xl lg:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto font-light">
          {profile.tagline}
        </p>
        
        <div className="flex justify-center space-x-6 mb-12">
          <a 
            href={profile.socialLinks.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group text-slate-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110" 
            aria-label="GitHub"
          >
            <GithubIcon className="w-8 h-8 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
          </a>
          <a 
            href={profile.socialLinks.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group text-slate-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110" 
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-8 h-8 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
          </a>
          <a 
            href={profile.socialLinks.email} 
            className="group text-slate-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110" 
            aria-label="Email"
          >
            <MailIcon className="w-8 h-8 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
          </a>
        </div>
        
        <a 
          href="#about" 
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:shadow-cyan-500/40 hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 inline-block"
        >
          Saiba Mais Sobre Mim
        </a>
      </div>
    </section>
  );
};

export default HeroSection;