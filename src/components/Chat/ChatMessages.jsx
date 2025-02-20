// src/components/Chat/ChatMessages.jsx
import React, { useEffect, useRef } from "react";
import MyChatBox from "../Cards/MyChatbox";

const ChatMessages = ({ messages, myId }) => {
  // const messagesEndRef = useRef(null);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({
  //     block: "end",
  //   });
  // }, [messages]);

  return (
    <div className="flex flex-col">
      {messages?.map((item, index) => (
        <div
          className="pb-3"
          key={item.id}
          // ref={index === messages.length - 1 ? messagesEndRef : null}
        >
          <MyChatBox
            owner={myId === item.sender.id ? "mine" : "others"}
            item={item}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
