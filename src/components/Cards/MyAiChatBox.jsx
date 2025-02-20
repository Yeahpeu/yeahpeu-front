import { useChatStore } from "../../stores/chatStore";
import defaultAvatar from "../../assets/judgedog.png";
import { convertKST } from "../../data/util/timeUtils";
import TypewriterComponent from "typewriter-effect";

const MyAiChatBox = ({ owner, message }) => {
  const colorVariants = {
    others: "flex",
    mine: "flex flex-row-reverse",
  };
  return (
    <div
      className={`${colorVariants[owner]} items-start gap-2 ${
        owner === "mine" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {owner === "mine" || (
        <img
          src={defaultAvatar}
          alt={`ai 의 프로필`}
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
      <div
        className={`flex flex-col gap-1 ${
          owner === "mine" ? "items-end" : "items-start"
        }`}
      >
        {owner === "mine" || (
          <span className="text-sm text-gray-600">시누이</span>
        )}
        <div className="flex flex-row gap-1 items-end">
          <div
            className={`rounded-lg p-2 shadow-sm block w-fit ${
              owner === "mine" ? "bg-gray-100" : "bg-red-100"
            }`}
          >
            {owner === "mine" ? (
              <span className="block break-all whitespace-pre-wrap max-w-60 max-h-96 overflow-y-auto text-start break-words">
                {message}
              </span>
            ) : (
              <div className="text-left">
                <TypewriterComponent
                  options={{
                    strings: [message], // AI 메시지를 타이핑 효과로 표시
                    autoStart: true,
                    loop: false,
                    delay: 50, // 글자 입력 속도
                    deleteSpeed: Infinity,
                    cursor: "",
                  }}
                  wrapperClassName="text-left whitespace-pre-line text-sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAiChatBox;
