import React, { useState, useRef, useEffect } from "react";

const CuteCalendarPopup = ({
  onDateSelect,
  containerClass,
  initialDate,
  inputClass,
}) => {
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 5,
    today.getMonth(),
    today.getDate()
  );
  const maxDate = new Date(
    today.getFullYear() + 5,
    today.getMonth(),
    today.getDate()
  );

  // 부모에서 받은 initialDate로 초기화 (string → Date 객체)
  const initial = initialDate ? new Date(initialDate) : new Date();
  const [currentDate, setCurrentDate] = useState(initial);
  const [selectedDate, setSelectedDate] = useState(initial);
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);

  // prop initialDate가 변경되면 내부 state 업데이트
  useEffect(() => {
    const newInitial = initialDate ? new Date(initialDate) : new Date();
    setCurrentDate(newInitial);
    setSelectedDate(newInitial);
  }, [initialDate]);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  const prevMonth = () => {
    const prevDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    if (prevDate >= minDate) {
      setCurrentDate(prevDate);
    }
  };

  const nextMonth = () => {
    const nextDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    if (nextDate <= maxDate) {
      setCurrentDate(nextDate);
    }
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    newDate.setHours(12, 0, 0, 0);

    if (newDate >= minDate && newDate <= maxDate) {
      setSelectedDate(newDate);
      if (onDateSelect) {
        onDateSelect(newDate.toISOString().split("T")[0]);
      }
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      {/* 날짜 입력 필드 */}
      <input
        type="text"
        value={selectedDate.toISOString().split("T")[0]}
        readOnly
        className={`${inputClass} w-full
          px-3 
          py-2 
          text-sm
          border
          border-gray-300 
          rounded-lg 
          focus:outline-none 
          focus:ring-2 
          focus:ring-red-100
          focus:border-red-200
          disabled:opacity-50
          disabled:cursor-not-allowed`}
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* 달력 팝업 */}
      {isOpen && (
        <div
          ref={calendarRef}
          className={`${containerClass} w-64 bg-white shadow-lg border rounded-lg p-4 z-50`}
        >
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              className={`text-gray-600 hover:text-gray-700 ${
                currentDate <= minDate ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentDate <= minDate}
            >
              &lt;
            </button>
            <h2 className="text-lg font-semibold">
              {currentDate.getFullYear()}년 {months[currentDate.getMonth()]}
            </h2>
            <button
              onClick={nextMonth}
              className={`text-gray-600 hover:text-gray-700 ${
                currentDate >= maxDate ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentDate >= maxDate}
            >
              &gt;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekdays.map((day, index) => (
              <div
                key={index}
                className="text-center text-sm font-medium text-gray-600"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="p-2"></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              );
              const isToday =
                day === today.getDate() &&
                currentDate.getMonth() === today.getMonth() &&
                currentDate.getFullYear() === today.getFullYear();

              const isSelected =
                day === selectedDate.getDate() &&
                currentDate.getMonth() === selectedDate.getMonth() &&
                currentDate.getFullYear() === selectedDate.getFullYear();

              const isDisabled = date < minDate || date > maxDate;

              return (
                <button
                  key={day}
                  onClick={() => !isDisabled && handleDateSelect(day)}
                  className={`flex items-center justify-center w-8 h-8 text-sm rounded-md transition-all duration-200 
                    hover:ring-rose-300 
                    ${isToday ? "bg-red-50 text-gray-700" : ""}
                    ${isSelected ? "bg-rose-400 text-white font-bold" : "text-gray-700"}
                    ${isDisabled ? "opacity-30 cursor-not-allowed" : ""}`}
                  disabled={isDisabled}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CuteCalendarPopup;
