import MyBudgetCard from "../components/Cards/MyBudgetCard";

const HomeBudgetMolecule = () => {
  return (
    <div className="my-2">
      <div className="text-left p-2 font-bold">예산</div>
      <MyBudgetCard
        total={1000000}
        expend={10000}
        balance={1000}
        onClick={"라우터 네비게이트 들어갈 자리"}
      />
    </div>
  );
};

export default HomeBudgetMolecule;
