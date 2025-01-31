import { useEffect, useState } from "react";
import { useTabStore } from "../../stores/commonStore";
import { Link, useLocation } from "react-router-dom";

const MyTab = ({ leftValue, rightValue, leftTo, rightTo }) => {
  const [activeTab, setActiveTab] = useState(`${leftValue}`);
  // const { activeTab, setActiveTab } = useTabStore();

  return (
    <div className="flex mx-8 items-center justify-center bg-gray-100 p-2 rounded-lg shadow-inner shadow-slate-300 my-4">
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
