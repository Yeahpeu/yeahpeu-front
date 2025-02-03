import { useNavigate } from "react-router-dom";
import MyCompleteButton from "../common/MyCompleteButton";

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

  const locationName =
    event.location.length > 10
      ? `${event.location.slice(0, 10)}...`
      : event.location || "없음";

  const formattedTime = event.date ? convertToLocalTime(event.date) : "";

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
