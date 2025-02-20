import { useEffect, useState } from "react";
import MyBudgetCard from "../components/Cards/MyBudgetCard";
import HeaderMolecule from "../molecules/HeaderMolecule";
import MyAccordion from "../components/Cards/MyAccordion";
import { useBudgetQuery } from "../api/commonAPI";
import { useBudgetAPI } from "../api/homeAPI";
import { useBudgetStore } from "../stores/budgetStore";
import MyLoading from "../components/common/MyLoading";
import BudgetBar from "../components/common/BudgetBar";
import budgetImg from "../assets/budgetImg.png";

const BudgetPage = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const { data: detailData, isLoading: detailLoading } = useBudgetQuery();
  const { isLoading: summaryLoading } = useBudgetAPI();
  const { budgets, totalBudget, usedBudget, setBudgets } = useBudgetStore();

  useEffect(() => {
    if (detailData?.data) {
      setBudgets(detailData.data);
    }
  }, [detailData, setBudgets]);

  const handleAccordionClick = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  if (detailLoading || summaryLoading) {
    return (
      <div>
        <MyLoading />
      </div>
    );
  }

  return (
    <div className="flex flex-col px-8  ">
      <div className="flex flex-row items-center justify-center w-full my-4">
        <img src={budgetImg} alt="Yeahpeu Image" className="w-16 h-16" />
      </div>
      <MyBudgetCard
        total={totalBudget}
        expend={usedBudget}
        balance={totalBudget - usedBudget}
      />

      {/* <div className="mt-6">
        <BudgetBar budgets={budgets} />
      </div> */}

      <div className="mt-6">
        <p className="text-md font-bold mb-3 text-left ml-2">상세 내역</p>
        {budgets?.map((budget) => (
          <div key={budget.id} className="mb-3">
            <MyAccordion
              isOpen={openAccordion === budget.id}
              onClick={() => handleAccordionClick(budget.id)}
              title={budget.name}
              percent={budget.percent}
              value={budget.subCategories.map((sub) => ({
                subTitle: sub.name,
                price: sub.amount,
                subId: sub.id,
              }))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetPage;
