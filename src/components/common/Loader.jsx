const Loader = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-12 h-12 border-4",
    lg: "w-20 h-20 border-4",
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div
        className={`${sizeClasses[size]}
          border-on-surface 
          border-t-primary-container 
          rounded-full 
          animate-spin
        `}
      />
    </div>
  );
};

export default Loader;
