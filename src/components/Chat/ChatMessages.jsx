// src/components/Chat/ChatMessages.jsx
import React, { useEffect, useRef } from "react";
import MyChatBox from "../Cards/MyChatbox";

const ChatMessages = ({ messages, myId }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="flex flex-col overflow-y-auto mb-4 mt-12">
      {messages?.map((item) => (
        <div className="pb-3" key={item.id}>
          <MyChatBox
            owner={myId === item.sender.id ? "mine" : "others"}
            message={item.message}
          />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
