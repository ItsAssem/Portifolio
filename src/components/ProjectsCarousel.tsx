import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import Card from "./Card/Card";

import "swiper/css";
import "swiper/css/navigation";

interface Project {
  title: string;
  Glink: string;
  description: string;
  tags: string[];
}

interface ProjectsCarouselProps {
  projects: Project[];
}

const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ projects }) => {
  return (
    <div className="overflow-hidden flex flex-col justify-center align-middle content-center max-w-5xl w-full h-max">
      <h1 className="top-0 text-2xl sm:text-3xl font-bold text-green-500 mb-6 text-center">
        My Projects
      </h1>
      <div className="flex-row w-full max-w-7xl mx-auto h-max">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          centeredSlides={false}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center h-full">
                <Card
                  title={project.title}
                  githubLink={project.Glink}
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
