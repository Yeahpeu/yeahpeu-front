import { useState } from "react";
import moment from "moment";

const MyCalendar = ({ events = [], setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const eventSet = new Set(events);

  const startDate = moment(currentMonth).startOf("month").startOf("week");
  const endDate = moment(currentMonth).endOf("month").endOf("week");

  const days = [];
  let day = startDate.clone();
  while (day.isSameOrBefore(endDate, "day")) {
    days.push(day.clone());
    day.add(1, "day");
  }

  const prevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
  };

  return (
    <div className="max-w-sm mx-auto bg-red-50 p-4 rounded-lg shadow-md">
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
      <br />
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
          const hasEvent = eventSet.has(day.format("YYYY-MM-DD"));

          return (
            <div
              key={index}
              className={`relative p-2 text-gray-800 rounded-lg w-10 h-10 flex items-center justify-center  

              ${
                !isCurrentMonth
                  ? "text-gray-400 opacity-50 pointer-events-none"
                  : "cursor-pointer active:bg-red-200 hover:bg-red-100"
              }`}
              onClick={() =>
                isCurrentMonth && setSelectedDate(day.format("YYYY-MM-DD"))
              }
            >
              <div className="relative">
                {day.format("D")}
                {hasEvent && (
                  <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-violet-400 rounded-full"></div>
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
