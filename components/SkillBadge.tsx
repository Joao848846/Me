import React from 'react';
import { Skill } from '../types';

interface SkillBadgeProps {
  skill: Skill;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  const proficiencyWidth = skill.level ? `${skill.level * 20}%` : '0%'; // Max 5 levels, 20% each

  return (
    <div className="group bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 transition-all duration-300 group-hover:border-cyan-500/70 group-hover:shadow-xl group-hover:shadow-cyan-500/30 transform group-hover:scale-110 text-center">
      {skill.icon && (
        <div className="flex justify-center mb-2 text-cyan-400 group-hover:text-cyan-300 transition-colors">
          {React.cloneElement(skill.icon, { className: "w-8 h-8" })}
        </div>
      )}
      <h4 className="text-sm font-semibold text-white mb-1 truncate group-hover:text-cyan-400 transition-colors">{skill.name}</h4>
      {skill.level && (
        <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-purple-500 to-cyan-500 h-1.5 rounded-full transition-all duration-500 ease-out group-hover:opacity-100" 
            style={{ width: proficiencyWidth }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SkillBadge;