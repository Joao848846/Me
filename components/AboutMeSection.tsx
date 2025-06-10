
import React from 'react';
import Section from './Section';

interface AboutMeSectionProps {
  bio: string;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = ({ bio }) => {
  return (
    <Section id="about" title="Sobre Mim" className="bg-slate-900">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
          {bio}
        </p>
        {/* Placeholder for a more detailed "story" button or future expansion */}
        {/* <button className="mt-8 px-6 py-2 border border-cyan-500 text-cyan-500 rounded-md hover:bg-cyan-500 hover:text-white transition-colors">
          Minha Jornada Detalhada (Em Breve)
        </button> */}
      </div>
    </Section>
  );
};

export default AboutMeSection;
    