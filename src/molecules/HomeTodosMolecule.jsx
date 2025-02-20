import MyScheduleCard from "../components/Cards/MyScheduleCard";
import MyAiCard from "../components/Cards/MyAiCard";
import { useSchedules } from "../api/scheduleAPI";
import { useHomeAi } from "../api/aiAPI";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import MyLoading from "../components/common/MyLoading";

const HomeTodosMolecule = () => {
  const queryClient = useQueryClient();
  const { data: schedules, isLoading, error } = useSchedules();
  const [nextSchedule, setNextSchedule] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (schedules) {
      updateNextSchedule(schedules);
    }
  }, [schedules]);

  useEffect(() => {
    // nextSchedule이 변경될 때마다 애니메이션 트리거
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500); // 애니메이션 지속 시간과 일치시킴

    return () => clearTimeout(timer);
  }, [nextSchedule]);

  const updateNextSchedule = (updatedSchedules) => {
    const now = new Date();
    const upcomingSchedules = updatedSchedules
      .filter(
        (schedule) => !schedule.completed && new Date(schedule.date) > now
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    setNextSchedule(upcomingSchedules[0] || null);
  };

  const handleComplete = async (completedScheduleId) => {
    try {
      // 스케줄과 진행률 데이터 동시에 리프레시
      await Promise.all([
        queryClient.invalidateQueries(["schedules"]),
        queryClient.invalidateQueries(["progressBar"]),
      ]);
    } catch (error) {
      console.error("일정 완료 처리 실패:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="my-2">
        <div className="text-gray-700 text-sm text-left p-2 font-bold">
          다음 일정
        </div>
        <div>
          <MyLoading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="my-2">
          <div className="text-left p-2 font-bold">일정</div>
          <div className="p-4 text-center text-gray-500">
            일정을 불러오는데 실패했습니다
          </div>
        </div>
      </div>
    );
  }

  if (!nextSchedule) {
    return (
      <div className="my-2">
        <div className="text-sm text-left p-2 font-bold">다음일정</div>
        <div className="p-4 text-center text-gray-500">
          예정된 일정이 없습니다 ( °ᗝ° ).ᐟ
        </div>
      </div>
    );
  }

  return (
    <div className="my-2">
      <div className="text-gray-700 text-left p-2 font-bold">다음 일정</div>
      <div
        className={`${
          isAnimating ? "animate-fadeInFast pointer-events-none" : ""
        }`}
      >
        <MyScheduleCard event={nextSchedule} />
      </div>
      <div className="justify-center">
        <MyAiCard />
      </div>
    </div>
  );
};

export default HomeTodosMolecule;
