import React, { useState, useEffect, useRef } from "react";
import { useHomeAi } from "../../api/aiAPI";
import TypewriterComponent from "typewriter-effect";
import aiPlanner from "../../assets/puppy.png";
const MyAiCard = () => {
  const { data: homeAiChat, isLoading, error } = useHomeAi();

  const [mounted, setMounted] = useState(false);
  const [aiChatData, setAiChatData] = useState(null);

  useEffect(() => {
    if (homeAiChat) {
      setAiChatData(homeAiChat);
    }
  }, [homeAiChat]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading || !homeAiChat) {
    return <div></div>;
  }

  const text =
    homeAiChat.incomingDay +
    "\n" +
    homeAiChat.guide +
    "\n" +
    homeAiChat.checklist;

  return (
    <div className="flex items-start space-x-4 p-4 w-fit">
      <div>
        <div className="w-14 h-14 rounded-full bg-red-100">
          <img
            src={aiPlanner} // 실제 프로필 이미지 경로로 변경
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <div>
        <div className="text-gray-700 text-xs text-left bg-white shadow-md py-2 px-4 rounded">
          <TypewriterComponent
            options={{
              strings: [homeAiChat.incomingDay + "<br>" + homeAiChat.guide],
              autoStart: true,
              loop: false,
              delay: 50, // 글자 입력 속도
              deleteSpeed: Infinity,
              cursor: "",
            }}
            wrapperClassName="text-left whitespace-pre-line text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default MyAiCard;
