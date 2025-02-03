import MyScheduleCard from "../components/Cards/MyScheduleCard";
import { useSchedules } from "../api/scheduleAPI";

const HomeTodosMolecule = () => {
  const { data: schedules, isLoading, error } = useSchedules();

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (isLoading) {
    return (
      <div className="my-2">
        <div className="text-left p-2 font-bold">다음일정</div>
        <div className="p-4 text-center text-gray-500">로딩중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-2">
        <div className="text-left p-2 font-bold">다음일정</div>
        <div className="p-4 text-center text-gray-500">
          일정을 불러오는데 실패했습니다
        </div>
      </div>
    );
  }

  // 현재 날짜 이후의 미완료 일정 중 가장 가까운 일정 찾기
  const now = new Date();
  const nextSchedule = schedules
    ?.filter((schedule) => !schedule.completed && new Date(schedule.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  if (!nextSchedule) {
    return (
      <div className="my-2">
        <div className="text-left p-2 font-bold">다음일정</div>
        <div className="p-4 text-center text-gray-500">
          예정된 일정이 없습니다 ( °ᗝ° ).ᐟ
        </div>
      </div>
    );
  }

  // 날짜 포맷팅 적용
  const formattedSchedule = {
    ...nextSchedule,
    date: formatDate(nextSchedule.date),
  };

  return (
    <div className="my-2">
      <div className="text-left p-2 font-bold">다음일정</div>
      <MyScheduleCard event={formattedSchedule} />
    </div>
  );
};

export default HomeTodosMolecule;
