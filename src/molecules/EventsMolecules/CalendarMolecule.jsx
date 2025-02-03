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

  const { data: apiSchedules = [] } = useMonthSchedules(startDate, endDate);

  // ✅ 중복 데이터 방지 및 초기화 개선
  useEffect(() => {
    if (apiSchedules.length > 0) {
      // 기존 일정이 없을 때만 초기화
      if (schedules.length === 0) {
        resetSchedules();
      }

      // 스케줄 중복 방지
      apiSchedules.forEach((schedule) => {
        const exists = schedules.some((s) => s.id === schedule.id);
        if (!exists) {
          addSchedule(schedule);
        }
      });
    }
  }, [apiSchedules]);

  const filteredEvents = selectedDate
    ? schedules.filter((event) => event.date.split("T")[0] === selectedDate)
    : [];

  return (
    <div className="w-full p-4 flex flex-col items-center justify-center">
      <MyCalendar setSelectedDate={setSelectedDate} />

      {selectedDate && (
        <div className="mt-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <MyScheduleCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-lg">일정이 없습니다 ( °ᗝ° ).ᐟ </p>
          )}
        </div>
      )}

      <div className="flex items-center justify-center border w-12 h-12 rounded-full mt-8">
        <MyAddButton />
      </div>
    </div>
  );
};

export default CalendarMolecule;
