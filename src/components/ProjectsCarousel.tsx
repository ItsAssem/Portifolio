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
    <div className="flex w-full max-w-6xl flex-col justify-center">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-green-300 mb-8 text-center tracking-tight">
        My Projects
      </h1>
      <div className="w-full mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          className="overflow-visible!"
          spaceBetween={32}
          centeredSlides={false}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          slidesPerView={"auto"}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index} className="w-[350px]! sm:w-[380px]!">
              <div className="flex items-stretch justify-center h-full py-2">
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
