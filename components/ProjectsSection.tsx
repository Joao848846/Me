
import React, { useState, useRef } from 'react';
import { Project, ProjectType } from '../types';
import ProjectCard from './ProjectCard';
import Section from './Section';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Swiper styles are now linked in index.html

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [filter, setFilter] = useState<ProjectType | 'all'>('all');
  const swiperRef = useRef<any>(null); // For accessing Swiper instance

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.type === filter
  );

  const projectTypes = [
    { label: 'Todos', value: 'all' as 'all' | ProjectType },
    { label: ProjectType.PERSONAL, value: ProjectType.PERSONAL },
    { label: ProjectType.COLLABORATIVE, value: ProjectType.COLLABORATIVE }
  ];
  
  return (
    <Section id="projects" title="Meus Projetos" className="bg-slate-950">
      <div className="mb-12 flex justify-center space-x-2 sm:space-x-4">
        {projectTypes.map(pt => (
          <button
            key={pt.value}
            onClick={() => setFilter(pt.value)}
            className={`px-4 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 
                        ${filter === pt.value 
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg' 
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
          >
            {pt.label}
          </button>
        ))}
      </div>
      
      {filteredProjects.length > 0 ? (
        <div className="relative px-8 md:px-10"> {/* Added horizontal padding */}
          <Swiper
            key={filter} // Force re-render on filter change for Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={20} // Default space for mobile
            slidesPerView={1}  // Default slides for mobile
            autoHeight={true} // Let Swiper manage its height based on active slide
            observer={true} // Reinitialize Swiper on DOM changes
            observeParents={true} // Reinitialize Swiper on parent DOM changes
            navigation={{
              nextEl: '.swiper-button-next-custom', 
              prevEl: '.swiper-button-prev-custom', 
            }}
            pagination={{ clickable: true, el: '.swiper-pagination-custom' }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper; 
            }}
            className="pb-12 overflow-hidden" 
          >
            {filteredProjects.map((project) => (
              <SwiperSlide key={project.id} style={{ height: 'auto' }}> 
                 <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
          
          <button 
            aria-label="Projeto anterior"
            className="swiper-button-prev-custom absolute top-1/2 left-0 transform -translate-y-1/2 z-20 p-2.5 bg-slate-800/60 hover:bg-cyan-500/80 text-white rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
          >
            <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button 
            aria-label="Próximo projeto"
            className="swiper-button-next-custom absolute top-1/2 right-0 transform -translate-y-1/2 z-20 p-2.5 bg-slate-800/60 hover:bg-cyan-500/80 text-white rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
          >
            <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Custom Pagination Container */}
          <div className="swiper-pagination-custom text-center mt-6 space-x-2"></div>
        </div>
      ) : (
        <p className="text-center text-slate-400 text-lg">Nenhum projeto encontrado para este filtro.</p>
      )}
    </Section>
  );
};

export default ProjectsSection;