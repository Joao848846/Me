
import React from 'react';
import { EducationItem as EducationItemType } from '../types';
import EducationItem from './EducationItem';
import Section from './Section';

interface EducationSectionProps {
  items: EducationItemType[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ items }) => {
  return (
    <Section id="education" title="Formação & Certificados" className="bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="relative space-y-12">
          {/* Timeline central line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent hidden md:block"></div>
          
          {items.map((item, index) => (
            <EducationItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default EducationSection;
    