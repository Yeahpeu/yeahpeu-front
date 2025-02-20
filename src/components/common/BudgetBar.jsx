const BudgetBar = ({ budgets }) => {
  const totalPercent = budgets.reduce((sum, budget) => sum + budget.percent, 0);

  const categoryColors = {
    1: "bg-[#FFC2F0]",
    2: "bg-[#CABDFF]",
    3: "bg-[#C7F7FF]",
    4: "bg-[#FFF7B2]",
    5: "bg-[#FFD6B2]",
  };

  return (
    <div className="w-full h-6 bg-gray-200 rounded flex overflow-hidden">
      {budgets.map((budget) => {
        const widthPercent = totalPercent
          ? (budget.percent / totalPercent) * 100
          : 0;
        const bgColor = categoryColors[budget.id] || "bg-gray-300";
        return (
          <div
            key={budget.id}
            className={`${bgColor} h-full`}
            style={{ width: `${widthPercent}%` }}
            title={`${budget.name}: ${budget.percent}%`}
          />
        );
      })}
    </div>
  );
};

export default BudgetBar;
