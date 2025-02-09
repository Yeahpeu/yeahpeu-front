import { useState } from "react";
import MyBudgetCard from "../components/Cards/MyBudgetCard";
import HeaderMolecule from "../molecules/HeaderMolecule";
import MyAccordion from "../components/Cards/MyAccordion";
import { useBudgetQuery } from "../api/commonAPI";
import { useBudgetStore } from "../stores/homeStore";

const BudgetPage = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const { data, isLoading } = useBudgetQuery();
  const { totalBudget, usedBudget } = useBudgetStore();

  console.log(totalBudget, usedBudget);

  const handleAccordionClick = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    );
  }

  return (
    <div className="flex flex-col p-8">
      <HeaderMolecule />
      <MyBudgetCard
        total={totalBudget}
        expend={usedBudget}
        balance={totalBudget - usedBudget}
      />
      <div className="mt-6">
        <p className="text-lg font-bold mb-2 text-left ml-2">상세 내역</p>

        {data.data?.map((budget) => (
          <MyAccordion
            key={budget.id}
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
        ))}
      </div>
    </div>
  );
};

export default BudgetPage;
