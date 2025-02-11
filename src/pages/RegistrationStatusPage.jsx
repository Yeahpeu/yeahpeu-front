import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import MyInputPink from "../components/common/MyInput-pink";
import MyRole from "../components/Buttons/MyRole";
import useOnboardingStore from "../stores/onboardingStore";
import { useGetCategory } from "../api/onboardingAPI";
const CoupleInfoPage = () => {
  const navigate = useNavigate();
  const {
    weddingRole,
    weddingDay,
    budget,
    setWeddingRole,
    setWeddingDay,
    setBudget,
    setCategory,
  } = useOnboardingStore();
  const { data: category } = useGetCategory();
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);
  useEffect(() => {
    if (category) {
      setCategory(category);
      console.log(category);
    }
  });

  // 바깥 클릭 시 툴팁 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            value={budget === 0 ? "" : budget} // 0이면 빈 문자열로 표시
            onChange={(e) => {
              const value = Number(e.target.value);
              if (!isNaN(value) && value >= 0 && value <= 999999999) {
                setBudget(value);
              }
            }}
            className="border border-gray-300 rounded-md p-2 w-full"
            min={0}
            max={999999999}
          />
        </div>

        <div className="relative">
          <div className="flex items-center mb-4 justify-center">
            <h2 className="text-lg ">결혼식 예정 날짜</h2>
            {/* <button
              className="ml-2 text-gray-500 hover:text-gray-700 border rounded-full w-8 aspect-square flex items-center justify-center"
              onClick={() => setShowTooltip(!showTooltip)}
            >
              ?
            </button> */}
          </div>

          {/* {showTooltip && (
            <div
              ref={tooltipRef}
              className="absolute top-[-110%] left-1/2 -translate-x-1/2 bg-white bg-opacity-90 border border-gray-300 shadow-lg p-3 rounded-md w-auto max-w-xs text-sm text-gray-700"
            >
              📅 날짜 선택 가이드:
              <p>3개월 이하는 </p> <p>가일정 수립이 어려워요.</p>
            </div>
          )} */}

          <input
            type="date"
            className="border bg-red-50 border-gray-300 rounded-lg p-2 w-full"
            value={weddingDay ? weddingDay.split("T")[0] : ""}
            min={new Date().toISOString().split("T")[0]}
            max={
              new Date(new Date().setFullYear(new Date().getFullYear() + 3))
                .toISOString()
                .split("T")[0]
            }
            onChange={(e) => {
              const date = new Date(e.target.value);
              setWeddingDay(date.toISOString());
            }}
          />
          <p className="text-sm text-gray-300 mt-3">
            3개월 이하 일정은 가일정 수립이 어려워요.
          </p>
        </div>

        <div>
          <h2 className="text-lg mb-4">역할</h2>
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
