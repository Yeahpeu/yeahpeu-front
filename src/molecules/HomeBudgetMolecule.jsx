import MyBudgetCard from "../components/Cards/MyBudgetCard";
import { useNavigate } from "react-router-dom";
const HomeBudgetMolecule = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/budget");
  };
  return (
    <div className="my-2">
      <div className="text-left p-2 font-bold" onClick={handleClick}>
        예산 &gt;
      </div>
      <MyBudgetCard total={1000000} expend={10000} balance={1000} />
    </div>
  );
};

export default HomeBudgetMolecule;
