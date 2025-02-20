// src/components/Chat/ChatMessages.jsx
import React, { useEffect, useRef } from "react";
import MyAiChatBox from "../Cards/MyAiChatBox";

const ChatAiMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="flex flex-col overflow-y-auto mb-4 mt-4">
      {messages?.map((item) => (
        <div className="pb-3" key={item.id}>
          <MyAiChatBox
            owner={item.isAi ? "others" : "mine"}
            message={item.message}
          />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatAiMessages;
