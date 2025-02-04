import { useState, useEffect } from "react";
import moment from "moment";
import { useMonthSchedules } from "../../api/scheduleAPI";

const MyCalendar = ({ setSelectedDate }) => {
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

  const eventSet = new Set(
    events.map((event) => moment(event.date).format("YYYY-MM-DD"))
  );

  const prevMonth = () => {
    setCurrentMonth((prev) => prev.clone().subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => prev.clone().add(1, "month"));
  };

  return (
    <div className="w-full mx-auto bg-red-50 p-4 rounded-lg shadow-md">
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
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <div key={day} className="font-small">
            <b>{day}</b>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center">
        {days.map((day, index) => {
          const isCurrentMonth = day.month() === currentMonth.month();
          const formattedDate = day.format("YYYY-MM-DD");
          const hasEvent = eventSet.has(formattedDate);

          return (
            <div
              key={index}
              className={`relative p-2 text-gray-800 rounded-lg w-10 h-10 flex items-center justify-center  
              ${
                !isCurrentMonth
                  ? "text-gray-400 opacity-50 pointer-events-none"
                  : "cursor-pointer active:bg-red-200 hover:bg-red-100"
              }`}
              onClick={() => isCurrentMonth && setSelectedDate(formattedDate)}
            >
              <div className="relative">
                {day.format("D")}
                {hasEvent && (
                  <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-violet-500 rounded-full"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCalendar;
