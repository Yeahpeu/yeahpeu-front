import React, { useState } from "react";
import MyInputWhite from "../common/MyInput-white";
import MySendButton from "../common/MySendButton";
import MyAddFileButton from "../Buttons/MyAddFileButton";

const ChatInput = ({ chat, setChat, onSend, onAddFile, setChatMessage }) => {
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsFileSelected(true);
      setChat(file.name);
      onAddFile(event);
    }
  };

  const handleInputChange = (e) => {
    if (!isFileSelected) {
      const newMessage = e.target.value;
      setChat(newMessage);
      setChatMessage(newMessage);
    }
  };

  const handleSend = () => {
    onSend(() => {
      setIsFileSelected(false);
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center p-4 gap-2 bg-white">
      <textarea
        placeholder="채팅을 입력하세요"
        value={chat}
        onChange={handleInputChange}
        className={`w-full h-10 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-200 overflow-hidden ${
          isFileSelected
            ? "bg-gray-100 text-gray-500 cursor-not-allowed pointer-events-none"
            : ""
        }`}
        disabled={isFileSelected}
      />
      <MySendButton onClick={handleSend} />
      <MyAddFileButton onChange={handleFileChange} />
    </div>
  );
};

export default ChatInput;
