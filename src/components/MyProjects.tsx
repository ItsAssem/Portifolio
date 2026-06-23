import ProjectsCarousel from "./ProjectsCarousel";
import SectionCard from "./SectionCard";
import { useProjects } from "../hooks/useProjects";
import LoadingSkeleton from "./LoadingSkeleton";

const MyProjects = () => {
  const { projects, loading, error, refetch, isConfigured } = useProjects();

  return (
    <div className="w-full flex flex-col justify-center items-center font-sans text-base px-2 sm:px-4 md:px-6 lg:px-8">
      <SectionCard maxWidth="lg">
        <div className="text-center mb-3 sm:mb-4">
          <h2
            id="projects-heading"
            className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 animate-text-glow whitespace-normal mb-2"
          >
            My Projects
          </h2>
          <p className="text-xs sm:text-sm text-brand-secondary/80">
            Explore my recent work and technical projects
          </p>
        </div>

        <div
          className="min-h-[200px] sm:min-h-[300px]"
          aria-labelledby="projects-heading"
        >
          {!isConfigured && (
            <div className="text-center py-6 sm:py-8">
              <p className="text-brand-secondary text-sm sm:text-base">
                Projects are temporarily unavailable. Check back soon!
              </p>
            </div>
          )}

          {isConfigured && loading && <LoadingSkeleton />}

          {isConfigured && error && (
            <div className="text-center py-6 sm:py-8">
              <p className="text-red-400 text-sm sm:text-base mb-3">
                Error loading projects: {error}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-black rounded-full hover:bg-green-600 transition-colors text-xs sm:text-sm font-semibold focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Try Again
              </button>
            </div>
          )}

          {isConfigured && !loading && !error && projects.length > 0 && (
            <ProjectsCarousel projects={projects} />
          )}

          {isConfigured && !loading && !error && projects.length === 0 && (
            <div className="text-center py-6 sm:py-8">
              <p className="text-green-400 text-sm sm:text-base">
                No projects found. Check back soon!
              </p>
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
};

export default MyProjects;
