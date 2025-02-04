import MyBudgetCard from "../components/Cards/MyBudgetCard";
import { useNavigate } from "react-router-dom";
import { useBudgetStore } from "../stores/homeStore";
import { useBudgetAPI } from "../api/homeAPI";

const HomeBudgetMolecule = () => {
  const navigate = useNavigate();
  const { totalBudget, usedBudget } = useBudgetStore();
  const { data, isLoading } = useBudgetAPI();
  console.log(totalBudget, usedBudget);
  const handleClick = () => {
    navigate("/budget");
  };
  if (isLoading) {
    return (
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    );
  }
  return (
    <div className="my-2">
      <div className="text-left p-2 font-bold" onClick={handleClick}>
        예산 &gt;
      </div>
      <MyBudgetCard
        total={data.totalBudget}
        expend={data.usedBudget}
        balance={data.totalBudget - data.usedBudget}
      />
    </div>
  );
};

export default HomeBudgetMolecule;
