import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import Card2 from "./Card/Card";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Project {
  title: string;
  link: string;
  description: string;
  tags: string[];
}

interface ProjectsCarouselProps {
  projects: Project[];
}

const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ projects }) => {
  return (
    <div className="w-full">
      <style>{`
        .swiper-pagination-bullet {
          background: rgba(34, 197, 94, 0.3) !important;
          opacity: 0.8 !important;
          width: 8px !important;
          height: 8px !important;
          margin: 0 4px !important;
          border-radius: 50% !important;
          border: 1px solid rgba(34, 197, 94, 0.5) !important;
          transition: all 0.3s ease !important;
        }
        
        .swiper-pagination-bullet:hover {
          background: rgba(34, 197, 94, 0.6) !important;
          opacity: 1 !important;
          transform: scale(1.2) !important;
        }
        
        .swiper-pagination-bullet-active {
          background: rgba(34, 197, 94, 0.9) !important;
          opacity: 1 !important;
          transform: scale(1.3) !important;
          border-color: rgba(34, 197, 94, 0.8) !important;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.4) !important;
        }
        
        .swiper-pagination {
          position: absolute !important;
          bottom: 10px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
          z-index: 10 !important;
        }
        
        .swiper-wrapper {
          padding-bottom: 20px !important;
        }
        
        .swiper-slide {
          overflow: hidden !important;
        }
      `}</style>
      <div className="pb-4">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={16}
          centeredSlides={false}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
          }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center h-auto py-4">
                <Card2
                  title={project.title}
                  githubLink={project.link}
                  description={project.description}
                  tags={project.tags}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProjectsCarousel;
