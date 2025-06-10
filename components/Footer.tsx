
import React from 'react';

interface FooterProps {
  name: string;
}

const Footer: React.FC<FooterProps> = ({ name }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 bg-slate-900 border-t border-slate-800/50 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">
          &copy; {currentYear} {name}. Todos os direitos reservados.
        </p>
        <p className="text-xs text-slate-600 mt-1">
          Criado com <span className="text-cyan-500 animate-pulse-text-cyan">React</span>, <span className="text-purple-500 animate-pulse-text-purple">Tailwind CSS</span> e uma pitada de <span className="text-yellow-500 animate-pulse-text-yellow">magia futurista</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;