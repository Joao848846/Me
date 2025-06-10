import React, { useEffect, useRef, useState } from 'react';

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  hasBottomBorder?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = '', titleClassName = '', hasBottomBorder = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Observe only once
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // At least 10% of the element is visible
      }
    );

    const currentRef = sectionContentRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section 
      id={id} 
      className={`py-16 md:py-24 relative overflow-hidden ${hasBottomBorder ? 'border-b border-slate-800/50' : ''} ${className}`}
    >
      <div 
        ref={sectionContentRef}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {title && (
          <div className="text-center mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white relative inline-block ${titleClassName}`}>
              {title}
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-shimmer"></span>
            </h2>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;