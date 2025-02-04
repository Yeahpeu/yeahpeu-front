import { useTabStore } from "../../stores/commonStore";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const MyTab = ({ leftValue, rightValue, leftTo, rightTo }) => {
  const { activeTab, setActiveTab } = useTabStore();
  const location = useLocation();
  const pathname = location.pathname;
  useEffect(() => {
    if (pathname === "/schedule/calendar") {
      setActiveTab(`캘린더`);
    } else if (pathname === "/schedule/todos") {
      setActiveTab(`남은 일정`);
    } else if (pathname === "/chat/allchat") {
      setActiveTab(`모든 채팅`);
    } else if (pathname === "/chat/mychat") {
      setActiveTab(`나의 채팅`);
    }
  }, []);

  return (
    <div className="flex  items-center justify-center p-2 bg-gray-100 rounded-lg shadow-inner shadow-slate-300 my-4">
      <Link
        to={`${leftTo}`}
        className={`flex w-1/2 transition justify-center text-center py-2 rounded-l-lg ${
          activeTab === `${leftValue}`
            ? "bg-white font-bold text-black shadow-sm shadow-slate-400"
            : "text-gray-400"
        }`}
        onClick={() => setActiveTab(`${leftValue}`)}
      >
        {leftValue}
      </Link>

      <Link
        to={`${rightTo}`}
        className={`flex w-1/2 transition justify-center text-center py-2 rounded-r-lg ${
          activeTab === `${rightValue}`
            ? "bg-white font-bold text-black shadow-sm shadow-slate-400"
            : "text-gray-400"
        }`}
        onClick={() => setActiveTab(`${rightValue}`)}
      >
        {rightValue}
      </Link>
    </div>
  );
};

export default MyTab;
