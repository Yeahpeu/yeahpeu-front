// src/components/Chat/ChatHeader.jsx
import React from "react";

const ChatHeader = ({ roomTitle, onLeave, onDelete }) => {
  return (
    <header className="h-[72px]">
      <div className="flex flew-row justify-between fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-3 items-center h-[72px] max-w-[430px] mx-auto">
        <button
          onClick={onLeave}
          className="text-gray-700 rounded justify-self-start w-10"
        >
          &lt;
        </button>
        <h2 className="text-md font-bold text-center text-gray-700">
          {roomTitle}
        </h2>
        <button
          onClick={onDelete}
          className="flex flex-col items-center text-gray-500 text-sm rounded w-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#5f6368"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
          <p className="text-xs">떠나기</p>
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
