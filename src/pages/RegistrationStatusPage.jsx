import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import MyInputPink from "../components/common/MyInput-pink";
import MyRole from "../components/Buttons/MyRole";
import useOnboardingStore from "../stores/onboardingStore";
import { useGetCategory } from "../api/onboardingAPI";
import MyAlert from "../components/Modals/MyAlert";
import Select from "react-select";
import { convertUTC } from "../data/util/timeUtils";

const RegistrationStatusPage = () => {
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
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (category) {
      setCategory(category);
    }
  }, [category, setCategory]);

  // 날짜 선택 상태 (연도, 월, 일)
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  // 오늘 날짜 기준 정보
  const today = useMemo(() => new Date(), []);
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0부터 시작 (0: 1월)
  const currentDay = today.getDate();

  // 연도, 월, 일 선택 시 최소값 계산 함수
  const getMinMonth = (year) => {
    return year === currentYear ? currentMonth : 0;
  };

  const getMinDay = (year, month) => {
    if (year === currentYear && month === currentMonth) {
      return currentDay;
    }
    return 1;
  };

  // 연도 선택 옵션: 현재 연도부터 3년치 (예: 2025, 2026, 2027)
  const yearOptions = Array.from({ length: 3 }, (_, i) => ({
    value: currentYear + i,
    label: `${currentYear + i}`,
  }));

  // 월 선택 옵션: 1월 ~ 12월 (내부 값은 0부터 시작)
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: `${i + 1}`,
  }));

  // 일 선택 옵션: 선택된 연도와 월의 마지막 일자까지
  const dayOptions = useMemo(() => {
    const year = selectedYear || currentYear;
    const month = selectedMonth !== null ? selectedMonth : currentMonth;
    const lastDay = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: lastDay }, (_, i) => ({
      value: i + 1,
      label: `${i + 1}`,
    }));
  }, [selectedYear, selectedMonth, currentYear, currentMonth]);

  // 현재 날짜 조건에 따라 필터링된 월, 일 옵션 반환
  const getFilteredMonthOptions = (year) => {
    const minMonth = getMinMonth(year);
    return monthOptions.filter((option) => option.value >= minMonth);
  };

  const getFilteredDayOptions = (year, month) => {
    const minDay = getMinDay(year, month);
    return dayOptions.filter((option) => option.value >= minDay);
  };

  // 선택한 날짜를 KST로 입력받고, UTC ISO 문자열로 변환하여 반환
  const formatToUTCISOString = (year, month, day) => {
    // 날짜 문자열을 "YYYY-MM-DD" 형식으로 생성 (월, 일이 2자리)
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    // 시간은 00:00으로 고정하고 KST(+09:00)로 인식하여 UTC ISO 문자열로 변환
    return convertUTC(dateStr, "00:00");
  };

  // 초기 날짜 값 설정 (상태가 없을 경우)
  useEffect(() => {
    if (selectedYear === null) {
      const initialYear = currentYear;
      const initialMonth = getMinMonth(initialYear);
      const initialDay = getMinDay(initialYear, initialMonth);

      setSelectedYear(initialYear);
      setSelectedMonth(initialMonth);
      setSelectedDay(initialDay);

      const isoDate = formatToUTCISOString(
        initialYear,
        initialMonth,
        initialDay
      );
      setWeddingDay(isoDate);
    }
  }, [selectedYear, currentYear, currentMonth, currentDay, setWeddingDay]);

  // 연도 선택 변경 핸들러: 연도가 변경되면 월과 일을 초기화합니다.
  const handleYearChange = (option) => {
    const newYear = option.value;
    const defaultMonth = getMinMonth(newYear);
    const defaultDay = getMinDay(newYear, defaultMonth);

    setSelectedYear(newYear);
    setSelectedMonth(defaultMonth);
    setSelectedDay(defaultDay);
    setWeddingDay(formatToUTCISOString(newYear, defaultMonth, defaultDay));
  };

  // 월 선택 변경 핸들러: 월이 변경되면 일을 초기화합니다.
  const handleMonthChange = (option) => {
    const newMonth = option.value;
    const defaultDay = getMinDay(selectedYear, newMonth);

    setSelectedMonth(newMonth);
    setSelectedDay(defaultDay);
    setWeddingDay(formatToUTCISOString(selectedYear, newMonth, defaultDay));
  };

  // 일 선택 변경 핸들러
  const handleDayChange = (option) => {
    const day = option.value;
    setSelectedDay(day);
    setWeddingDay(formatToUTCISOString(selectedYear, selectedMonth, day));
  };

  // Alert 확인 버튼 핸들러
  const handleAlertConfirm = () => {
    if (
      alertMessage ===
      "필요한 항목을 선택하면\n결혼 준비 일정이 자동으로 완성됩니다!"
    ) {
      setAlertMessage("");
      navigate("/onboarding");
    } else {
      setAlertMessage("");
    }
  };

  const handleNext = () => {
    if (!weddingRole || !weddingDay || !budget) {
      setAlertMessage("모든 정보를 입력해주세요");
      return;
    }
    setAlertMessage(
      "필요한 항목을 선택하면\n결혼 준비 일정이 자동으로 완성됩니다!"
    );
  };

  // 천 단위 콤마 포맷 함수
  const formatNumber = (num) => {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <MyAlert message={alertMessage} onConfirm={handleAlertConfirm} />
        </div>
      )}
      <div className="flex items-center p-3 relative">
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
        <h1 className="text-xl text-red-300 font-bold text-center w-full">
          부부 정보
        </h1>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-7">
        <div>
          <h2 className="text-lg mb-4">예산정보</h2>
          <input
            type="number"
            inputMode="numeric"
            maxLength={9}
            placeholder="예산을 입력해주세요"
            value={budget === 0 ? "" : budget}
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = value === "" ? 0 : Number(value);
              if (
                !isNaN(numericValue) &&
                numericValue >= 0 &&
                numericValue <= 999999999
              ) {
                setBudget(numericValue);
              }
            }}
            onKeyDown={(e) => {
              if (["e", "E", "+", "-", "."].includes(e.key)) {
                e.preventDefault();
              }
            }}
            onPaste={(e) => {
              const paste = e.clipboardData.getData("text/plain");
              if (/[eE+\-.]/.test(paste)) {
                e.preventDefault();
              }
            }}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-200"
          />

          <p className="text-sm text-gray-300 mt-3">
            10억 이내 금액만 설정이 가능합니다.
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center mb-4 justify-center">
            <h2 className="text-lg">결혼식 예정 날짜</h2>
          </div>
          <div className="flex gap-4 justify-between">
            <Select
              options={yearOptions}
              value={yearOptions.find(
                (option) => option.value === selectedYear
              )}
              onChange={handleYearChange}
              className="w-1/3"
              isSearchable={false}
            />
            <Select
              options={
                selectedYear
                  ? getFilteredMonthOptions(selectedYear)
                  : monthOptions
              }
              value={monthOptions.find(
                (option) => option.value === selectedMonth
              )}
              onChange={handleMonthChange}
              className="w-1/4"
              isSearchable={false}
            />
            <Select
              options={
                selectedYear !== null && selectedMonth !== null
                  ? getFilteredDayOptions(selectedYear, selectedMonth)
                  : dayOptions
              }
              value={dayOptions.find((option) => option.value === selectedDay)}
              onChange={handleDayChange}
              className="w-1/4"
              isSearchable={false}
            />
          </div>
          <p className="text-sm text-gray-300 mt-3">
            날짜는 오늘 이후이며, 3년 이내여야 합니다.
            <br />
            3개월 이내 일정은 가일정 수립이 어렵습니다.
          </p>
        </div>

        <div>
          <h2 className="text-lg">역할</h2>
          <MyRole
            selectedRole={weddingRole}
            onClick={(role) => setWeddingRole(role.toUpperCase())}
          />
        </div>
      </div>

      <div className="p-3">
        <button
          onClick={handleNext}
          className="w-full py-3 bg-red-200 text-white rounded-lg font-medium"
        >
          다 음
        </button>
      </div>
    </div>
  );
};

export default RegistrationStatusPage;
