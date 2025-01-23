import { useState } from "react";

const MyTab = ({ leftValue, rightValue }) => {
  const [activeTab, setActiveTab] = useState(`${leftValue}`);

  return (
    <div className="flex items-center justify-center bg-gray-100 p-2 rounded-lg shadow-inner shadow-slate-300 my-4">
      <button
        className={`flex w-1/2 transition justify-center text-center py-2 rounded-l-lg ${
          activeTab === `${leftValue}`
            ? "bg-white font-bold text-black shadow-sm shadow-slate-400"
            : "text-gray-400"
        }`}
        onClick={() => setActiveTab(`${leftValue}`)}
      >
        {leftValue}
      </button>

      <button
        className={`flex w-1/2 transition justify-center text-center py-2 rounded-r-lg ${
          activeTab === `${rightValue}`
            ? "bg-white font-bold text-black shadow-sm shadow-slate-400"
            : "text-gray-400"
        }`}
        onClick={() => setActiveTab(`${rightValue}`)}
      >
        {rightValue}
      </button>
    </div>
  );
};

export default MyTab;
