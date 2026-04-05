function SummaryCard({ title, amount }) {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-5 rounded-xl shadow-md dark:shadow-black/40 hover:shadow-xl hover:scale-[1.02] transition duration-300">
      
      <h3 className="text-gray-500 dark:text-gray-400 text-sm">
        {title}
      </h3>

      <p className="text-2xl font-bold mt-2">
        ₹ {amount}
      </p>

    </div>
  );
}

export default SummaryCard;