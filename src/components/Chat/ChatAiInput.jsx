import React, { useState } from "react";
import MySendButton from "../common/MySendButton";

const ChatAiInput = ({
  chat,
  setChat,
  onSend,
  setChatMessages,
  isUploading,
  isUsed,
  isDisabled,
  isAnswered,
}) => {
  const [isFileSelected, setIsFileSelected] = useState(false);

  const countNewlines = (text) => {
    return (text.match(/\n/g) || []).length;
  };

  const handleInputChange = (e) => {
    if (!isFileSelected) {
      const newMessage = e.target.value;
      const newlineCount = countNewlines(newMessage);

      if (newlineCount <= 9 || newMessage.length < chat.length) {
        setChat(newMessage);
      }
    }
  };

  const handleSend = () => {
    onSend(() => {
      setIsFileSelected(false);
    });
  };

  return (
    <div className="max-w-[430px]  mx-auto fixed bottom-0 left-0 right-0 flex items-center p-4 gap-2 bg-white border-t border-gray-100">
      <div className="relative flex-1">
        <textarea
          maxLength={100}
          placeholder={
            isAnswered
              ? "판결 완료! 시누이는 집에 갔습니다.."
              : isDisabled
                ? "답변을 기다리는 중입니다."
                : "채팅을 입력하세요"
          }
          value={chat}
          onChange={handleInputChange}
          disabled={isDisabled}
          className={`w-full h-10 p-2 resize-none rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-200 overflow-hidden  
            ${
              isFileSelected || isUploading || isDisabled
                ? "bg-gray-100 text-gray-500 cursor-not-allowed pointer-events-none"
                : ""
            }`}
        />
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 rounded-md">
            <div className="w-5 h-5 border-2 border-red-200 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      <MySendButton onClick={handleSend} disabled={isDisabled} />
    </div>
  );
};

export default ChatAiInput;
