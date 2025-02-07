import React, { useState } from "react";
import MyInputWhite from "../common/MyInput-white";
import MySendButton from "../common/MySendButton";
import MyAddFileButton from "../Buttons/MyAddFileButton";

const ChatInput = ({
  chat,
  setChat,
  onSend,
  onAddFile,
  setChatMessage,
  isUploading,
}) => {
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsFileSelected(true);
      setChat(file.name);
      onAddFile(event);
      event.target.value = "";
    }
  };

  const countNewlines = (text) => {
    return (text.match(/\n/g) || []).length;
  };

  const handleInputChange = (e) => {
    if (!isFileSelected) {
      const newMessage = e.target.value;

      const newlineCount = countNewlines(newMessage);

      if (newlineCount <= 9 || newMessage.length < chat.length) {
        setChat(newMessage);
        setChatMessage(newMessage);
      }
    }
  };

  const handleSend = () => {
    onSend(() => {
      setIsFileSelected(false);
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center p-4 gap-2 bg-white">
      <div className="relative flex-1">
        <textarea
          maxLength={100}
          placeholder="채팅을 입력하세요"
          value={chat}
          onChange={handleInputChange}
          className={`w-full h-10 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-200 overflow-hidden  
            ${
              isFileSelected || isUploading
                ? "bg-gray-100 text-gray-500 cursor-not-allowed pointer-events-none"
                : ""
            }`}
          disabled={isFileSelected || isUploading}
        />
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 rounded-md">
            <div className="w-5 h-5 border-2 border-red-200 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      <MySendButton
        onClick={handleSend}
        disabled={isUploading}
        className={isUploading ? "opacity-50 cursor-not-allowed" : ""}
      />
      <MyAddFileButton
        onChange={handleFileChange}
        disabled={isUploading}
        className={isUploading ? "opacity-50 cursor-not-allowed" : ""}
      />
    </div>
  );
};

export default ChatInput;
