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
    <div className="flex flex-col justify-center align-middle content-center max-w-5xl w-full h-max">
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
          loop={true}
          slidesPerView="auto"
          breakpoints={{
            0: {
              slidesPerView: "auto",
              spaceBetween: 32,
            },
            768: {
              slidesPerView: "auto",
              spaceBetween: 32,
            },
            1280: {
              slidesPerView: "auto",
              spaceBetween: 32,
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
