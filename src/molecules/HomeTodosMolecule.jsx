import MyScheduleCard from "../components/Cards/MyScheduleCard";
import { useSchedules } from "../api/scheduleAPI";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { completeSchedule } from "../api/homeAPI";

const HomeTodosMolecule = () => {
  const queryClient = useQueryClient();
  const { data: schedules, isLoading, error } = useSchedules();
  const [nextSchedule, setNextSchedule] = useState(null);

  useEffect(() => {
    if (schedules) {
      updateNextSchedule(schedules);
    }
  }, [schedules]);

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
      await completeSchedule(completedScheduleId);
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

  return (
    <div className="my-2">
      <div className="text-left p-2 font-bold">다음일정</div>
      <MyScheduleCard event={nextSchedule} />
    </div>
  );
};

export default HomeTodosMolecule;
