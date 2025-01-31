// ChatRoomPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyAddButton from "../components/common/MyAddButton";

const ChatRoomPage = () => {
  const { roomId } = useParams(); // URL에서 roomId 추출
  const navigate = useNavigate();
  const myId = 1;
  const dummyChatMessage = {
    items: [
      {
        id: 1,
        roomId: 1,
        sender: {
          id: 4,
          nickname: "하늘",
        },
        message: "신부 들러리 역할을 어떻게 준비하고 있나요?",
        sentAt: "2025-01-31T11:19:04.233Z",
        attachments: [],
      },
      {
        id: 2,
        roomId: 1,
        sender: {
          id: 2,
          nickname: "수진",
        },
        message:
          "결혼 준비 Q&A 시간이에요. 궁금한 점 있으신 분들은 질문해주세요.",
        sentAt: "2025-01-31T11:29:04.233Z",
        attachments: [],
      },
      {
        id: 3,
        roomId: 1,
        sender: {
          id: 5,
          nickname: "지훈",
        },
        message: "결혼식 테마는 무엇으로 정하셨나요?",
        sentAt: "2025-01-31T11:39:04.233Z",
        attachments: [],
      },
      {
        id: 4,
        roomId: 1,
        sender: {
          id: 1,
          nickname: "은지",
        },
        message: "신혼여행 계획은 어떻게 세우고 계신가요?",
        sentAt: "2025-01-31T11:49:04.233Z",
        attachments: [],
      },
      {
        id: 5,
        roomId: 1,
        sender: {
          id: 3,
          nickname: "민수",
        },
        message: "결혼식 장소 추천 좀 부탁드립니다!",
        sentAt: "2025-01-31T11:59:04.233Z",
        attachments: [],
      },
    ],
  };

  // 나가기 버튼 클릭 시 이전 페이지로 이동
  const handleLeaveChat = () => {
    navigate(-1); // 이전 페이지로 돌아감
  };

  return (
    <div className="p-4">
      <button
        onClick={handleLeaveChat}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        나가기
      </button>
      <h2 className="text-2xl font-bold mb-4">채팅방 ID: {roomId}</h2>

      {/* 채팅방 콘텐츠 예시 */}
      {/* <div className="mb-4">
        {dummyChatMessage.items.map((item) => (
          <div className="cursor-pointer active:bg-red-100 hover:bg-red-50">
            <MyChatBox
              owner={myId == item.sender.id ? "1" : "0"}
              message={item.message}
            />
          </div>
        ))}
        실제 채팅 구현 로직 추가
      </div> */}

      {/* 나가기 버튼 */}
    </div>
  );
};

export default ChatRoomPage;
