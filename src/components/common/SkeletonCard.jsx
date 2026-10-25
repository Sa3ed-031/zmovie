const SkeletonCard = () => {
  return (
    <div className="animate-pulse flex flex-col rounded-lg overflow-hidden bg-surface-container">
      <div className="bg-gray-700 aspect-2/3 w-full"></div>
      <div className="p-3 flex flex-col gap-3">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-600 rounded w-1/2"></div>
        <div className="h-7 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
