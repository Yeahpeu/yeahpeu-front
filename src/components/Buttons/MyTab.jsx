import { useTabStore } from "../../stores/commonStore";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const MyTab = ({ leftValue, rightValue, leftTo, rightTo }) => {
  const { activeTab, setActiveTab } = useTabStore();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (pathname === "/schedule/calendar") {
      setActiveTab("캘린더");
    } else if (pathname === "/schedule/todos") {
      setActiveTab("남은 일정");
    } else if (pathname === "/chat/allchat") {
      setActiveTab("모든 채팅");
    } else if (pathname === "/chat/mychat") {
      setActiveTab("나의 채팅");
    }
  }, [location]);

  return (
    <div className="flex text-sm items-center justify-center p-2.5 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl shadow-lg my-3 relative overflow-hidden">
      <div className="absolute w-full h-full bg-gray-50 opacity-20 blur-xl top-0 left-0"></div>
      <Link
        to={leftTo}
        className={`relative flex w-1/2 transition-all duration-200 justify-center text-center py-3 rounded-l-2xl  shadow-md transform active:scale-95 
          ${activeTab === leftValue ? "shadow-inner bg-gray-50 font-bold text-gray-700  scale-100" : "font-bold text-gray-600"}
        `}
        onClick={() => setActiveTab(leftValue)}
      >
        {leftValue}
      </Link>

      <Link
        to={rightTo}
        className={`relative flex w-1/2 transition-all duration-200 justify-center text-center py-3 rounded-r-2xl  shadow-md transform active:scale-95 
          ${activeTab === rightValue ? "bg-gray-50 font-bold text-gray-700 shadow-inner scale-100" : "font-bold text-gray-600"}
        `}
        onClick={() => setActiveTab(rightValue)}
      >
        {rightValue}
      </Link>
    </div>
  );
};

export default MyTab;
