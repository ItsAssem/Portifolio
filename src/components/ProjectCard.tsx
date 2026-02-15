import type { Project } from "../hooks/useProjects";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="flex flex-col justify-between bg-black/40 backdrop-blur-md h-[500px] outline-1 p-6 sm:p-8 w-full max-w-md rounded-2xl border-2 border-green-500/50 shadow-lg whitespace-pre-line animate-liquid-glow drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]">
      {/* Header Section */}
      <div className="flex flex-col gap-4 shrink-0">
        <h2 className="text-center text-lg sm:text-xl md:text-2xl font-bold text-green-400 animate-text-glow whitespace-normal">
          {project.title}
        </h2>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span
              className="inline-block bg-[#00df9a]/30 text-green-300 text-xs sm:text-sm font-medium px-3 py-1 rounded-full hover:bg-green-800/40 backdrop-blur-sm transition-colors"
              key={index}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-4 flex-1 min-h-0">
        <p className="overflow-y-auto text-green-100/70 leading-relaxed pr-2">
          {project.description}
        </p>

        {/* Conditional Button */}
        {project.link ? (
          <a
            className="mt-auto border-2 border-green-500/50 rounded-full px-6 py-3 text-sm sm:text-base font-semibold text-black bg-linear-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-105 hover:shadow-green-500/40 hover:from-green-500 hover:to-emerald-600 active:scale-95 animate-pulse shrink-0"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Project Link
          </a>
        ) : (
          <div className="mt-auto h-[52px] shrink-0"></div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
