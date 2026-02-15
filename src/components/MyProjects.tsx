import ProjectsCarousel from "./ProjectsCarousel";
import { useProjects } from "../hooks/useProjects";
import LoadingSkeleton from "./LoadingSkeleton";

/**
 * MyProjects component - Main projects section with dynamic data loading.
 *
 * Displays projects in a carousel format with loading states, error handling,
 * and empty state management. Integrates with Supabase backend for real-time
 * project data.
 *
 * @component
 * @returns {JSX.Element} Rendered projects section with carousel
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
    // Main container with responsive layout and glassmorphism styling
    <div className="h-full flex justify-center align-middle items-center font-serif text-base sm:p-5 w-full">
      <div className="flex w-full max-w-6xl overflow-hidden justify-center align-middle items-center py-10 m-1 border-green-300 rounded-2xl">
        {/* Loading State - Show skeleton while fetching data */}
        {loading && <LoadingSkeleton />}

        {/* Error State - Display error with retry functionality */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 text-lg mb-4">
              Error loading projects: {error}
            </p>
            <button
              onClick={() => refetch()}
              className="px-6 py-3 bg-green-500 text-black rounded-full hover:bg-green-600 transition-colors font-semibold"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Success State - Display projects in carousel */}
        {!loading && !error && <ProjectsCarousel projects={projects} />}

        {/* Empty State - No projects found */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-green-400 text-lg">
              No projects found. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;
