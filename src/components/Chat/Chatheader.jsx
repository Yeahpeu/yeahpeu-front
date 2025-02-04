// src/components/Chat/ChatHeader.jsx
import React from "react";

const ChatHeader = ({ roomTitle, onLeave, onDelete }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-3 grid grid-cols-3 items-center mb-3">
      <button
        onClick={onLeave}
        className="px-4 py-2 text-black rounded justify-self-start"
      >
        &lt;
      </button>
      <h2 className="text-xl font-bold text-center">{roomTitle}</h2>
      <button
        onClick={onDelete}
        className="px-4 py-2 text-red-500 font-bold text-sm rounded justify-self-end"
      >
        떠나기
      </button>
    </div>
  );
};

export default ChatHeader;
