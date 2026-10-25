const MoviesTVsTaps = ({ tabs, setPage, activeTab, setActiveTab }) => {
  return (
    <div className="flex self-start flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => {
            setActiveTab(tab.key);
            setPage(1);
          }}
          className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
            activeTab === tab.key
              ? "bg-primary-container text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
export default MoviesTVsTaps;
