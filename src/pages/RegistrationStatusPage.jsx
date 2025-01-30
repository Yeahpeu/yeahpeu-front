import { useNavigate } from "react-router-dom";
import MyInputPink from "../components/common/MyInput-pink";
import MyRole from "../components/Buttons/MyRole";
import useOnboardingStore from "../stores/onboardingStore";

const CoupleInfoPage = () => {
  const navigate = useNavigate();
  const {
    weddingRole,
    weddingDay,
    budget,
    setWeddingRole,
    setWeddingDay,
    setBudget,
  } = useOnboardingStore();

  const handleNext = () => {
    if (!weddingRole || !weddingDay || !budget) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center p-4 relative">
        <button onClick={() => navigate(-1)} className="absolute left-4">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-xl text-rose-300 font-medium text-center w-full">
          부부 정보
        </h1>
      </header>

      <div className="flex-1 p-6 flex flex-col gap-8">
        <div>
          <h2 className="text-lg mb-4">예산정보</h2>
          <MyInputPink
            type="number"
            placeholder="예산을 입력해주세요"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>

        <div>
          <h2 className="text-lg mb-4">결혼식 예정 날짜</h2>
          <input
            type="date"
            className="border bg-red-50 border-gray-300 rounded-lg p-2 w-full"
            value={weddingDay}
            onChange={(e) => setWeddingDay(e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-lg mb-4 transition">역할</h2>
          <MyRole
            selectedRole={weddingRole}
            onClick={(role) => setWeddingRole(role.toUpperCase())}
          />
        </div>
      </div>

      <div className="p-6">
        <button
          onClick={handleNext}
          className="w-full py-3 bg-rose-300 text-white rounded-lg font-medium"
        >
          다 음
        </button>
      </div>
    </div>
  );
};

export default CoupleInfoPage;
