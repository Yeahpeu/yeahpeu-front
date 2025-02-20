import MyBudgetCard from "../components/Cards/MyBudgetCard";
import { useNavigate } from "react-router-dom";
import { useBudgetStore } from "../stores/budgetStore";
import { useBudgetAPI } from "../api/homeAPI";

const HomeBudgetMolecule = () => {
  const navigate = useNavigate();
  const { totalBudget, usedBudget } = useBudgetStore();
  const { data, isLoading } = useBudgetAPI();
  const handleClick = () => {
    navigate("/budget");
  };
  if (isLoading) {
    return <div className="w-8 h-8 rounded-full animate-spin"></div>;
  }
  return (
    <div className="my-2">
      <MyBudgetCard
        total={data.totalBudget}
        expend={data.usedBudget}
        balance={data.totalBudget - data.usedBudget}
        onClick={handleClick}
      />
    </div>
  );
};

export default HomeBudgetMolecule;
