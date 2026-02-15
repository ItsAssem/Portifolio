import React from "react";
import ProjectsCarousel from "./ProjectsCarousel";

const MyProjects = () => {
  const projects = [
    {
      title: "Q-SAR Drone Swarm for Disaster Management",
      Glink: "https://mahmoudmohamed.vercel.app/",
      description:
        " -Designed and implemented a scalable disaster response system using autonomous drone swarms\n -Developed navigation algorithms and integrated real-time control with Mission Planner and sensor fusion \n-Improved system efficiency by 20% through optimized algorithms and advanced automation",
      tags: ["React", "NodeJS"],
    },
    {
      title: "Second Project",
      Glink: "https://example.com/second-project",
      description: "An innovative project with modern design patterns.",
      tags: ["React", "TypeScript"],
    },
    {
      title: "Third Project",
      Glink: "https://example.com/third-project",
      description: "A creative project showcasing advanced techniques.",
      tags: ["React", "Tailwind"],
    },
    {
      title: "Fourth Project",
      Glink: "https://example.com/fourth-project",
      description: "A robust application with scalable architecture.",
      tags: ["React", "NodeJS"],
    },
    {
      title: "Fifth Project",
      Glink: "https://example.com/fifth-project",
      description: "A dynamic project leveraging cutting-edge technologies.",
      tags: ["React", "GraphQL"],
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 py-10 flex justify-center items-center font-serif text-base">
      <div className="w-full max-w-6xl rounded-2xl border border-green-400/15 bg-black/20 backdrop-blur-sm px-4 sm:px-8 py-10">
        <ProjectsCarousel projects={projects} />
      </div>
    </div>
  );
};

export default MyProjects;
