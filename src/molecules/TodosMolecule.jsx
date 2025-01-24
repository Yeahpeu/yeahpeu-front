import MyScheduleCard from "../components/Cards/MyScheduleCard";
import axios from "axios";

const CalendarMolecule = () => {
  const fetchEvents = async () => {
    const response = await axios.get("get요청주소");
    return response.data;
  };

  const events = [
    {
      id: 1,
      mainCategoryId: 1,
      title: "드레스 투어",
      date: "2025-01-10T10:00:00Z",
      location: "강남 웨딩숍 거리",
      Completed: true,
    },
    {
      id: 2,
      mainCategoryId: 3,
      title: "메이크업 리허설",
      date: "2025-01-12T10:00:00Z",
      location: "청담동 메이크업샵",
      Completed: false,
    },
    {
      id: 3,
      mainCategoryId: 2,
      title: "예식장 방문",
      date: "2025-01-10T14:00:00Z",
      location: "남산 예식장",
      Completed: false,
    },
  ];

  const groupedEvents = events.reduce((acc, event) => {
    const eventDate = new Date(event.date).toISOString().split("T")[0]; // "YYYY-MM-DD" 형식
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
      {sortedDates.map((date) => (
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
      ))}
    </div>
  );
};

export default CalendarMolecule;
