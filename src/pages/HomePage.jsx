import HeaderMolecule from "../molecules/HeaderMolecule";
import HomeBudgetMolecule from "../molecules/HomeBudgetMolecule";
import HomeProgressMolecule from "../molecules/HomeProgressMolecule";
import HomeTodosMolecule from "../molecules/HomeTodosMolecule";
import QuotesMolecule from "../molecules/QuotesMolecule";
import { useCheckOnboarding } from "../api/onboardingAPI";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MyLoading from "../components/common/MyLoading";

const HomePage = () => {
  const navigate = useNavigate();
  const { data: onboarded, isLoading, error } = useCheckOnboarding();

  useEffect(() => {
    if (!isLoading && onboarded) {
      if (!onboarded.onboarded) {
        navigate("/invitationCode");
      }
    }
  }, [onboarded, isLoading, navigate]);

  if (isLoading) {
    <div>
      <MyLoading />
    </div>;
  }

  if (error) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <div className="flex flex-col bg-gray-50 pt-44">
      <div className="fixed w-full top-0 left-0 bg-gradient-to-br from-red-100 to-red-200 rounded-b-3xl shadow-lg mb-2 px-8 pb-4 z-30">
        <HeaderMolecule />
        <HomeProgressMolecule />
      </div>
      <div className="px-8">
        <QuotesMolecule />
        <HomeBudgetMolecule />
        <HomeTodosMolecule />
      </div>
    </div>
  );
};

export default HomePage;
