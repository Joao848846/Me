
import React from 'react';
import { Skill } from '../types';
import SkillBadge from './SkillBadge';
import Section from './Section';

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <Section id="skills" title="Minhas Habilidades" className="bg-slate-950">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {skills.map((skill) => (
          <SkillBadge key={skill.id} skill={skill} />
        ))}
      </div>
      <p className="text-center text-slate-500 mt-12 text-sm italic">
        E sempre aprendendo mais...
      </p>
    </Section>
  );
};

export default SkillsSection;
    