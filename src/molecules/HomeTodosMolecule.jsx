import MyScheduleCard from "../components/Cards/MyScheduleCard";

const HomeTodosMolecule = () => {
  const sample = {
    id: 1,
    mainCategoryId: 1,
    title: "부모님 시간 일정 맞추기",
    date: "2025-01-19T14:00:00Z",
    location: "없음",
    Completed: false,
  };
  return (
    <div className="my-2">
      <div className="text-left p-2 font-bold">다음일정</div>
      <MyScheduleCard event={sample} />
    </div>
  );
};

export default HomeTodosMolecule;
