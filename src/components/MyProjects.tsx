import ProjectsCarousel from "./ProjectsCarousel";
import { useProjects } from "../hooks/useProjects";
import LoadingSkeleton from "./LoadingSkeleton";

/**
 * MyProjects component - Mobile-first compact projects section.
 *
 * Displays projects in a compact format optimized for mobile browser UI constraints.
 * Integrates with Supabase backend for real-time project data.
 *
 * @component
 * @returns {JSX.Element} Rendered projects section with compact layout
 *
 * @example
 * ```tsx
 * <MyProjects />
 * ```
 */
const MyProjects = () => {
  // Fetch projects data and manage state
  const { projects, loading, error, refetch } = useProjects();

  return (
    // Mobile-First Compact Container
    <div className="w-full flex flex-col justify-center items-center font-serif text-base px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Compact Projects Card */}
      <div className="w-full max-w-7xl bg-green-800/20 backdrop-blur-xl rounded-xl p-2 sm:p-3 md:p-4 m-2 sm:m-4 border-2 border-green-300">
        {/* Header - Compact */}
        <div className="text-center mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 animate-text-glow whitespace-normal mb-2">
            My Projects
          </h2>
          <p className="text-xs sm:text-sm text-[#14df9e]/80">
            Explore my recent work and technical projects
          </p>
        </div>

        {/* Projects Content - Compact */}
        <div className="min-h-[200px] sm:min-h-[300px]">
          {/* Loading State - Compact */}
          {loading && <LoadingSkeleton />}

          {/* Error State - Compact */}
          {error && (
            <div className="text-center py-6 sm:py-8">
              <p className="text-red-400 text-sm sm:text-base mb-3">
                Error loading projects: {error}
              </p>
              <button
                onClick={() => refetch()}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-black rounded-full hover:bg-green-600 transition-colors text-xs sm:text-sm font-semibold"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Success State - Compact Carousel */}
          {!loading && !error && <ProjectsCarousel projects={projects} />}

          {/* Empty State - Compact */}
          {!loading && !error && projects.length === 0 && (
            <div className="text-center py-6 sm:py-8">
              <p className="text-green-400 text-sm sm:text-base">
                No projects found. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
