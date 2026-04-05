function InsightsCard({ title, value, subtitle, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-5 rounded-xl shadow-md dark:shadow-black/40 hover:shadow-lg transition">
      
      <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">
        {title}
      </h3>

      <p className={`text-2xl font-bold ${color}`}>
        {value}
      </p>

      {subtitle && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default InsightsCard;