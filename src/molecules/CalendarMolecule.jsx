import { useState } from "react";
import MyCalendar from "../components/Cards/MyCalendar";
import MyScheduleCard from "../components/Cards/MyScheduleCard";
import moment from "moment";
import MyAddButton from "../components/common/MyAddButton";

const CalendarMolecule = () => {
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const events = [
    {
      id: 1,
      mainCategoryId: 1,
      title: "부모님 시간 일정 맞추기",
      date: "2025-01-19T14:00:00Z",
      location: "없음",
      Completed: false,
    },
    {
      id: 2,
      mainCategoryId: 3,
      title: "드레스 투어",
      date: "2025-01-10T10:00:00Z",
      location: "강남 웨딩숍 거리",
      Completed: true,
    },
  ];

  // 선택한 날짜의 이벤트 필터링
  const filteredEvents = selectedDate
    ? events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.toISOString().split("T")[0] === selectedDate;
      })
    : [];

  return (
    <div className="max-w-md mx-auto p-4 flex-col">
      <MyCalendar
        events={events.map((e) => e.date.split("T")[0])}
        setSelectedDate={setSelectedDate}
      />

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
      <div className={"items-center border w-8 rounded-full"}>
        <MyAddButton />
      </div>
    </div>
  );
};

export default CalendarMolecule;
