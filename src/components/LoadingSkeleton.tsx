const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div 
          key={i} 
          className="flex flex-col justify-between bg-black/40 backdrop-blur-md h-[500px] outline-1 p-6 sm:p-8 w-full max-w-md rounded-2xl border-2 border-green-500/50 animate-pulse"
        >
          {/* Title Skeleton */}
          <div className="flex flex-col gap-4 shrink-0">
            <div className="h-8 bg-green-500/20 rounded-lg animate-pulse"></div>
            
            {/* Tags Skeleton */}
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-20 bg-green-500/20 rounded-full animate-pulse"></div>
              <div className="h-6 w-24 bg-green-500/20 rounded-full animate-pulse"></div>
              <div className="h-6 w-16 bg-green-500/20 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Description Skeleton */}
          <div className="flex flex-col gap-4 flex-1 min-h-0">
            <div className="space-y-2">
              <div className="h-4 bg-green-500/20 rounded animate-pulse"></div>
              <div className="h-4 bg-green-500/20 rounded animate-pulse"></div>
              <div className="h-4 bg-green-500/20 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-green-500/20 rounded animate-pulse"></div>
              <div className="h-4 bg-green-500/20 rounded w-2/3 animate-pulse"></div>
            </div>
            
            {/* Button Skeleton */}
            <div className="mt-auto h-[52px] bg-green-500/20 rounded-full animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
