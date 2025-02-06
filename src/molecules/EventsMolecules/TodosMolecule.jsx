import MyScheduleCard from "../../components/Cards/MyScheduleCard";
import { useSchedules } from "../../api/scheduleAPI";
import MyEmptyCard from "../../components/Cards/MyEmptyCard";

const CalendarMolecule = () => {
  const { data: schedules = [] } = useSchedules();

  const groupedEvents = schedules.reduce((acc, event) => {
    const date = new Date(event.date);
    date.setHours(date.getHours());

    const eventDate = date.toISOString().split("T")[0];
    if (!acc[eventDate]) {
      acc[eventDate] = [];
    }
    acc[eventDate].push(event);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedEvents).sort();

  const getKoreanDay = (dateString) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  return (
    <div>
      {sortedDates.length === 0 ? (
        <p className=" flex items-center justify-center ">
          <MyEmptyCard value={"일정을 추가해서 결혼식을 준비하세요"} />
        </p>
      ) : (
        sortedDates.map((date) => (
          <div key={date} className="pb-4">
            <h2 className="text-lg font-bold m-2 text-left">
              {date} ({getKoreanDay(date)})
            </h2>

            {groupedEvents[date]
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((event) => (
                <MyScheduleCard event={event} key={event.id} />
              ))}
          </div>
        ))
      )}
    </div>
  );
};

export default CalendarMolecule;
