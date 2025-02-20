// src/components/Chat/ChatHeader.jsx
import React from "react";

const ChatAiHeader = ({ roomTitle, onLeave, disabled }) => {
  return (
    <header className="h-[72px]">
      <div className="flex flew-row justify-between fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-3 items-center h-[72px] max-w-[430px] mx-auto">
        <button
          onClick={onLeave}
          disabled={disabled}
          className="text-gray-700 rounded justify-self-start w-10"
        >
          &lt;
        </button>
        <h2 className="text-md font-bold text-center">{roomTitle}</h2>
        <button className="flex flex-col items-center text-gray-500 text-sm rounded w-10"></button>
      </div>
    </header>
  );
};

export default ChatAiHeader;
