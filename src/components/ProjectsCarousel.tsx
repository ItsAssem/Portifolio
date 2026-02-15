import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import Card2 from "./Card/Card";

import "swiper/css";
import "swiper/css/navigation";

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
    <div className="flex flex-col justify-center align-middle content-center max-w-6xl w-full h-max px-4 py-8">
      <h1 className="top-0 text-2xl sm:text-3xl font-extrabold text-green-500 mb-8 text-center">
        My Projects
      </h1>
      <div className="flex-row w-full max-w-7xl mx-auto h-max">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={32}
          centeredSlides={false}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center h-full">
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
