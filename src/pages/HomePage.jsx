import { useEffect } from "react";
import HeaderMolecule from "../molecules/HeaderMolecule";
import HomeBudgetMolecule from "../molecules/HomeBudgetMolecule";
import HomeProgressMolecule from "../molecules/HomeProgressMolecule";
import HomeTodosMolecule from "../molecules/HomeTodosMolecule";
import QuotesMolecule from "../molecules/QuotesMolecule";

const HomePage = () => {
  return (
    <div className="flex flex-col p-8">
      <HeaderMolecule />
      <HomeProgressMolecule marriagePercent={33} />
      <QuotesMolecule />
      <HomeBudgetMolecule />
      <HomeTodosMolecule />
    </div>
  );
};

export default HomePage;
