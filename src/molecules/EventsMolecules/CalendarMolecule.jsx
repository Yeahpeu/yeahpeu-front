import { useEffect, useState } from "react";
import MyCalendar from "../../components/Cards/MyCalendar";
import MyScheduleCard from "../../components/Cards/MyScheduleCard";
import moment from "moment";
import MyAddButton from "../../components/common/MyAddButton";
import { useScheduleStore } from "../../stores/scheduleStore";
import { useMonthSchedules } from "../../api/scheduleAPI";

const CalendarMolecule = () => {
  const { addSchedule, schedules, resetSchedules } = useScheduleStore();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const currentMonth = moment(selectedDate);
  const startDate = currentMonth.startOf("month").format("YYYY-MM-DD");
  const endDate = currentMonth.endOf("month").format("YYYY-MM-DD");

  const { data: monthschedule = [] } = useMonthSchedules(startDate, endDate);

  useEffect(() => {
    if (monthschedule.length > 0) {
      resetSchedules();

      monthschedule.forEach((schedule) => {
        const exists = schedules.some((s) => s.id === schedule.id);
        if (!exists) {
          addSchedule(schedule);
        }
      });
    }
  }, [monthschedule]);

  const filteredEvents = selectedDate
    ? schedules.filter(
        (event) => moment(event.date).format("YYYY-MM-DD") === selectedDate
      )
    : [];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <MyCalendar
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />

      {selectedDate && (
        <div className="mt-8 w-full">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <MyScheduleCard key={event.id} event={event} />
            ))
          ) : (
            <div>
              {/* {moment(selectedDate).format("D일")}  */}
              <p>일정이 없습니다.ᐟ</p>
              <p>새로운 일정을 수립하세요</p>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-center border w-12 h-12 rounded-full mt-8">
        <MyAddButton location={"/schedule/todos/input"} />
      </div>
    </div>
  );
};

export default CalendarMolecule;
