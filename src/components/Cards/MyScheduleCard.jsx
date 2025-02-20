import { useNavigate } from "react-router-dom";
import MyCompleteButton from "../common/MyCompleteButton";
import { useState, useEffect } from "react";
import { completeEvents, useMonthSchedules } from "../../api/scheduleAPI";
import { useScheduleStore } from "../../stores/scheduleStore";
import confetti from "../../assets/js/confetti";

const convertToLocalTime = (utcDateTime) => {
  return new Date(utcDateTime).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const MyScheduleCard = ({ event }) => {
  const navigate = useNavigate();
  const { updateSchedule } = useScheduleStore();
  const { refetch } = useMonthSchedules();

  useEffect(() => {
    setCompleted(event.completed);
  }, [event]);

  const categoryColors = {
    1: "bg-[#FFC2F0]",
    2: "bg-[#CABDFF]",
    3: "bg-[#C7F7FF]",
    4: "bg-[#FFF7B2]",
    5: "bg-[#FFD6B2]",
  };

  if (!event) return null;

  const [completed, setCompleted] = useState(event.completed);
  const { mutate: toggleComplete, isLoading } = completeEvents();

  useEffect(() => {
    setCompleted(event.completed);
  }, [event.completed]);

  const handleCompleteClick = () => {
    if (!completed) confetti();
    toggleComplete(
      { eventId: event.id, completed: !completed },
      {
        onSuccess: (data) => {
          setCompleted(data.completed);
          updateSchedule(event.id, { completed: data.completed });
        },
        onError: (error) => {
          console.error("완료 처리 실패:", error);
        },
      }
    );
  };

  const locationName =
    event.location.length > 8
      ? `${event.location.slice(0, 8)}...`
      : event.location || "없음";

  const titleName =
    event.title.length > 15
      ? `${event.title.slice(0, 15)}...`
      : event.title || "없음";

  const formattedTime = event.date ? convertToLocalTime(event.date) : "";

  return (
    <div className="text-gray-700 bg-white rounded-lg shadow-md mb-4 p-4 w-full flex items-center justify-between relative ">
      <div className="absolute top-4 right-6">
        <MyCompleteButton
          isCompleted={completed}
          onClick={handleCompleteClick}
        />
      </div>

      <div className="flex items-center space-x-3">
        <div
          className={`w-4 h-4 rounded-full ${
            categoryColors[event.mainCategoryId]
          }`}
        ></div>
        <div
          onClick={() => navigate(`/schedule/todos/detail/${event.id}`)}
          className="pl-1"
        >
          <div className="font-bold text-sm flex pb-2">{titleName}</div>
          <div className="text-gray-500 text-xs flex justify-between w-40">
            <span>{locationName}</span>
            <span>{formattedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyScheduleCard;
