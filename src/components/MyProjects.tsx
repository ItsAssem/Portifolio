import React from "react";
import ProjectsCarousel from "./ProjectsCarousel";
import { useProjects, type Project } from "../hooks/useProjects";
import LoadingSkeleton from "./LoadingSkeleton";
import { testSupabaseConnection } from "../test-connection";

const MyProjects = () => {
  const { projects, loading, error, refetch } = useProjects();

  // Test connection on mount
  React.useEffect(() => {
    testSupabaseConnection();
  }, []);

  return (
    <div className="h-full flex justify-center align-middle items-center font-serif text-base sm:p-5 w-full">
      <div className="flex w-full max-w-6xl overflow-hidden justify-center align-middle items-center py-10 m-1 border-green-300 rounded-2xl">
        {/* Loading State */}
        {loading && <LoadingSkeleton />}

        {/* Error State */}
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

        {/* Projects Carousel */}
        {!loading && !error && <ProjectsCarousel projects={projects} />}

        {/* Empty State */}
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
