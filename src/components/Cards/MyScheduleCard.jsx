import { useNavigate } from "react-router-dom";
import MyCompleteButton from "../common/MyCompleteButton";
import { useState } from "react";
import { completeEvents } from "../../api/scheduleAPI";

const convertToLocalTime = (utcDateTime) => {
  return new Date(utcDateTime).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const MyScheduleCard = ({ event }) => {
  const navigate = useNavigate();
  const categoryColors = {
    1: "bg-[#FF85EB]",
    2: "bg-[#AB92FF]",
    3: "bg-[#A6F2FF]",
    4: "bg-[#FFE748]",
    5: "bg-[#FF9447]",
  };

  if (!event) return null;

  const [completed, setCompleted] = useState(event.completed); // 완료 상태 관리
  const { mutate: toggleComplete, isLoading } = completeEvents();

  const handleCompleteClick = () => {
    toggleComplete(
      { eventId: event.id, completed: !completed },
      {
        onSuccess: () => {
          setCompleted((prev) => !prev); // 성공 시 완료 상태 업데이트
        },
        onError: (error) => {
          console.error("완료 처리 실패:", error);
        },
      }
    );
  };

  const locationName =
    event.location.length > 10
      ? `${event.location.slice(0, 10)}...`
      : event.location || "없음";

  const titleName =
    event.title.length > 10
      ? `${event.title.slice(0, 10)}...`
      : event.title || "없음";

  const formattedTime = event.date ? convertToLocalTime(event.date) : "";

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 p-4 w-full flex items-center justify-between border relative">
      <div className="absolute top-4 right-6">
        <MyCompleteButton
          isCompleted={event.completed}
          onClick={handleCompleteClick}
        />
      </div>

      <div className="flex items-center space-x-3">
        <div
          className={`w-4 h-4 rounded-full ${categoryColors[event.mainCategoryId]}`}
        ></div>
        <div
          onClick={() => navigate(`/schedule/todos/detail/${event.id}`)}
          className="pl-1"
        >
          <div className="font-bold text-lg flex pb-1">{titleName}</div>
          <div className="text-gray-500 text-sm flex justify-between w-44">
            <span>{locationName}</span>
            <span>{formattedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyScheduleCard;
