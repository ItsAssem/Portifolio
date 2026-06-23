const ProjectCardSkeleton = () => (
  <div className="flex flex-col justify-between bg-black/40 backdrop-blur-md min-h-[280px] max-h-[min(500px,70dvh)] h-[350px] sm:h-[400px] md:h-[450px] p-2 sm:p-3 md:p-4 w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl border-2 border-green-500/50 animate-pulse mx-auto">
    <div className="flex flex-col gap-2 shrink-0">
      <div className="h-6 sm:h-8 bg-green-500/20 rounded-lg" />
      <div className="flex flex-wrap gap-2">
        <div className="h-5 w-16 bg-green-500/20 rounded-full" />
        <div className="h-5 w-20 bg-green-500/20 rounded-full" />
        <div className="h-5 w-14 bg-green-500/20 rounded-full" />
      </div>
    </div>
    <div className="flex flex-col gap-2 flex-1 min-h-0">
      <div className="space-y-2">
        <div className="h-3 bg-green-500/20 rounded" />
        <div className="h-3 bg-green-500/20 rounded" />
        <div className="h-3 bg-green-500/20 rounded w-3/4" />
        <div className="h-3 bg-green-500/20 rounded w-5/6" />
      </div>
      <div className="mt-auto h-9 sm:h-10 bg-green-500/20 rounded-full" />
    </div>
  </div>
);

const LoadingSkeleton = () => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-4"
      aria-busy="true"
      aria-label="Loading projects"
    >
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-center py-4">
          <ProjectCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
