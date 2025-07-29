const VideoCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-sm border border-gray-200 dark:border-slate-700 rounded-md overflow-hidden animate-pulse">
      <div className="w-full h-0" style={{ paddingBottom: "56.25%" }}>
        <div className="absolute inset-0 bg-gray-200 dark:bg-slate-700 rounded-t-md"></div>
      </div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default VideoCardSkeleton;
