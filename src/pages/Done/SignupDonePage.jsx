import { Navigate } from "react-router-dom";
import HeaderMolecule from "../../molecules/HeaderMolecule";

const SignupDonePage = () => {
  const navigate = Navigate();

  const handleNext = () => {
    navigate("/onboarding");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <HeaderMolecule />
      <h1 className="text-lg font-bold text-red-400 mb-2">결혼 준비하기</h1>
      <p className="text-sm text-gray-500 text-center mb-2">
        원활한 결혼 준비를 위해 <br />
        준비하고 있는 과정을 확인할게요
      </p>
      <p className="text-sm text-red-400 font-bold text-center mb-6">
        분류별 한 개의 일정은 <br /> 꼭! 선택해 주세요
      </p>
      <div className="p-6">
        <button
          onClick={handleNext}
          className="w-full py-3 bg-rose-300 text-white rounded-lg font-medium"
        >
          상세 일정 선택
        </button>
      </div>
    </div>
  );
};

export default SignupDonePage;
