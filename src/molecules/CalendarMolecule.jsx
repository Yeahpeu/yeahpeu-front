import MyCalendar from "../components/Cards/MyCalendar";

const CalendarMolecule = () => {
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
      title: "드레스 투어",
      date: "2025-01-1T10:00:00Z",
      location: "강남 웨딩숍 거리",
      Completed: true,
    },
  ];

  return (
    <div>
      <MyCalendar events={events} />
    </div>
  );
};

export default CalendarMolecule;
