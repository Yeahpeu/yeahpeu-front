import { useNavigate } from "react-router-dom";
import MyCompleteButton from "../common/MyCompleteButton";

const MyScheduleCard = ({ event }) => {
  const navigate = useNavigate();
  const categoryColors = {
    1: "bg-[#FF85EB]",
    2: "bg-[#AB92FF]",
    3: "bg-[#A6F2FF]",
    4: "bg-[#FFE748]",
    5: "bg-[#FF9447]",
  };

  if (!event) return null; // 안전 장치

  const locationName =
    event.location.length > 10
      ? `${event.location.slice(0, 10)}...`
      : event.location;

  // "2025-01-10T10:00:00Z" -> "19:00" 변환
  const formattedTime = event.date
    ? new Date(event.date).toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "";

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 p-4 w-full flex items-center justify-between border relative">
      <div className="absolute top-4 right-6">
        <MyCompleteButton
          isCompleted={event.Completed}
          onClick={() => console.log(`완료 상태 변경: ${event.id}`)}
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
          <div className="font-bold text-lg flex pb-1">{event.title}</div>
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
