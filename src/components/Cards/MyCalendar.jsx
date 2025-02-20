import { useState } from "react";
import moment from "moment";
import { useMonthSchedules } from "../../api/scheduleAPI";

const categoryColors = {
  1: "bg-[#FFC2F0]",
  2: "bg-[#CABDFF]",
  3: "bg-[#C7F7FF]",
  4: "bg-[#FFF7B2]",
  5: "bg-[#FFD6B2]",
};

const MyCalendar = ({ setSelectedDate, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const startDate = currentMonth.startOf("month").format("YYYY-MM-DD");
  const endDate = currentMonth.endOf("month").format("YYYY-MM-DD");

  const { data: events = [] } = useMonthSchedules(startDate, endDate);

  const startOfCalendar = moment(currentMonth).startOf("month").startOf("week");
  const endOfCalendar = moment(currentMonth).endOf("month").endOf("week");

  const days = [];
  let day = startOfCalendar.clone();
  while (day.isSameOrBefore(endOfCalendar, "day")) {
    days.push(day.clone());
    day.add(1, "day");
  }

  const prevMonth = () => {
    setCurrentMonth((prev) => prev.clone().subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => prev.clone().add(1, "month"));
  };

  return (
    <div className="w-full mx-auto bg-red-50 dark:bg-gray-100 p-4 rounded-xl shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-gray-600 p-2">
          &lt;
        </button>
        <h2 className="text-lg font-semibold">
          {currentMonth.format("MMMM YYYY")}
        </h2>
        <button onClick={nextMonth} className="text-gray-600 p-2">
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-gray-500 text-xs mb-2">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((dayName) => (
          <div key={dayName} className="font-small">
            <b>{dayName}</b>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center items-center justify-items-center">
        {days.map((day, index) => {
          const isCurrentMonth = day.month() === currentMonth.month();
          const formattedDate = day.format("YYYY-MM-DD");

          const eventsForDay = events.filter(
            (event) => moment(event.date).format("YYYY-MM-DD") === formattedDate
          );
          const uniqueCategories = [
            ...new Set(eventsForDay.map((event) => event.mainCategoryId)),
          ];

          return (
            <div
              key={index}
              className={`relative w-10 h-10 p-2 text-gray-700 rounded-lg flex flex-col items-center justify-center text-center
              ${
                !isCurrentMonth
                  ? "text-gray-400 opacity-50 pointer-events-none"
                  : selectedDate === formattedDate
                    ? "bg-red-100"
                    : ""
              }`}
              onClick={() => isCurrentMonth && setSelectedDate(formattedDate)}
            >
              <div className="relative">{day.format("D")}</div>
              {uniqueCategories.length > 0 && (
                <div className="absolute bottom-[1px] left-1/2 transform -translate-x-1/2 flex gap-1">
                  {uniqueCategories.slice(0, 3).map((catId) => (
                    <div
                      key={catId}
                      className={`w-1.5 h-1.5 rounded-full ${
                        categoryColors[catId] || "bg-gray-500"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCalendar;
