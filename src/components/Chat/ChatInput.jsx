import React from "react";
import MyInputWhite from "../common/MyInput-white";
import MySendButton from "../common/MySendButton";

const ChatInput = ({ chat, setChat, onSend }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center p-4 bg-white">
      <MyInputWhite
        type="text"
        placeholder="채팅을 입력하세요"
        value={chat}
        onChange={(e) => setChat(e.target.value)}
        className="flex-grow"
      />
      <MySendButton className="ml-2" onClick={onSend} />
    </div>
  );
};

export default ChatInput;
