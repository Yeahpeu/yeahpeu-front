import { useState, useRef, useEffect } from "react";

const CuteTimeSelect = ({ initialValue, onTimeSelect }) => {
  const hourOptions = Array.from({ length: 24 }, (_, i) => i);
  const minuteOptions = Array.from({ length: 12 }, (_, i) => i * 5);

  const nowTime = () => {
    if (!initialValue) {
      const now = new Date();
      const hh = now.getHours();
      const mm = Math.floor(now.getMinutes() / 5) * 5;
      return { hour: hh, minute: mm };
    }
    const [hStr, mStr] = initialValue.split(":");
    return { hour: Number(hStr), minute: Number(mStr) };
  };

  const { hour: initHour, minute: initMinute } = nowTime();

  const [selectedHour, setSelectedHour] = useState(initHour);
  const [selectedMinute, setSelectedMinute] = useState(initMinute);

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // 팝업 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // "HH:mm" 형식으로 시간 포맷팅
  const formatTime = (h, m) => {
    const hh = String(h).padStart(2, "0");
    const mm = String(m).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const displayedValue = formatTime(selectedHour, selectedMinute);

  // initialValue가 변경되면 내부 state 업데이트 및 부모에 전달
  useEffect(() => {
    const { hour, minute } = nowTime();
    setSelectedHour(hour);
    setSelectedMinute(minute);
    onTimeSelect && onTimeSelect(formatTime(hour, minute));
  }, [initialValue]);

  const handleConfirm = () => {
    const timeString = formatTime(selectedHour, selectedMinute);
    setIsOpen(false);
    onTimeSelect && onTimeSelect(timeString);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* 보여지는 입력 필드 (readOnly) */}
      <input
        type="text"
        readOnly
        value={displayedValue}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-red-100 
                   focus:border-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute left-0 mt-2 w-60 bg-white shadow-lg border rounded-lg p-4 z-50">
          <div className="flex justify-between space-x-4">
            {/* 시 선택 영역 */}
            <div className="flex-1">
              <h3 className="text-sm font-medium mb-2 text-gray-600">시</h3>
              <div className="max-h-48 overflow-y-auto border rounded">
                {hourOptions.map((h) => {
                  const isSelected = h === selectedHour;
                  return (
                    <div
                      key={h}
                      onClick={() => setSelectedHour(h)}
                      className={`cursor-pointer px-2 py-1 text-sm hover:bg-rose-50 
                        ${isSelected ? "bg-rose-200 text-white font-bold" : "text-gray-700"}`}
                    >
                      {String(h).padStart(2, "0")}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* 분 선택 영역 */}
            <div className="flex-1">
              <h3 className="text-sm font-medium mb-2 text-gray-600">분</h3>
              <div className="max-h-48 overflow-y-auto border rounded">
                {minuteOptions.map((m) => {
                  const isSelected = m === selectedMinute;
                  return (
                    <div
                      key={m}
                      onClick={() => setSelectedMinute(m)}
                      className={`cursor-pointer px-2 py-1 text-sm hover:bg-rose-50 
                        ${isSelected ? "bg-rose-200 text-white font-bold" : "text-gray-700"}`}
                    >
                      {String(m).padStart(2, "0")}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleConfirm}
              className="px-4 py-2 text-sm text-white bg-rose-400 rounded hover:bg-rose-500"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CuteTimeSelect;
