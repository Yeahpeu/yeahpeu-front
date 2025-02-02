// ChatRoomPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyAddButton from "../components/common/MyAddButton";
import MyChatBox from "../components/Cards/MyChatbox";
import { useChatStore } from "../stores/chatStore";
import { motion } from "framer-motion";
import MyInputWhite from "../components/common/MyInput-white";
import MySendButton from "../components/common/MySendButton";
import { useChatSendMutation } from "../api/chatSendAPI";

const ChatRoomPage = () => {
  //const { roomId } = useParams(); // URL에서 roomId 추출
  const { roomId, roomTitle, chat, setChat } = useChatStore();
  const navigate = useNavigate();
  const chatSendMutation = useChatSendMutation();

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
        message: "안녕, 다들 준비됐어?",
        sentAt: "2025-01-31T11:00:00.000Z",
        attachments: [],
      },
      {
        id: 2,
        roomId: 1,
        sender: {
          id: 2,
          nickname: "수진",
        },
        message: "응, 조금 늦었어. 미안!",
        sentAt: "2025-01-31T11:01:10.000Z",
        attachments: [],
      },
      {
        id: 3,
        roomId: 1,
        sender: {
          id: 5,
          nickname: "지훈",
        },
        message: "괜찮아, 우리 이제 시작해보자.",
        sentAt: "2025-01-31T11:02:20.000Z",
        attachments: [],
      },
      {
        id: 4,
        roomId: 1,
        sender: {
          id: 1,
          nickname: "은지",
        },
        message: "오늘 주제는 결혼 준비야. 각자 준비한 거 공유해볼래?",
        sentAt: "2025-01-31T11:03:30.000Z",
        attachments: [],
      },
      {
        id: 5,
        roomId: 1,
        sender: {
          id: 3,
          nickname: "민수",
        },
        message: "신부 들러리 역할은 내가 맡을게. 재미있을 것 같아!",
        sentAt: "2025-01-31T11:04:40.000Z",
        attachments: [],
      },
      {
        id: 6,
        roomId: 1,
        sender: {
          id: 4,
          nickname: "하늘",
        },
        message: "민수야, 네 에너지 정말 좋다!",
        sentAt: "2025-01-31T11:05:50.000Z",
        attachments: [],
      },
      {
        id: 7,
        roomId: 1,
        sender: {
          id: 2,
          nickname: "수진",
        },
        message: "나도 결혼 준비 Q&A 시간 갖자는데, 다들 궁금한 점 있어?",
        sentAt: "2025-01-31T11:07:00.000Z",
        attachments: [],
      },
      {
        id: 8,
        roomId: 1,
        sender: {
          id: 5,
          nickname: "지훈",
        },
        message: "좋아, 어떤 점부터 얘기할까?",
        sentAt: "2025-01-31T11:08:10.000Z",
        attachments: [],
      },
      {
        id: 9,
        roomId: 1,
        sender: {
          id: 1,
          nickname: "은지",
        },
        message: "난 신혼여행 계획이 가장 어렵더라. 추천 좀 해줘!",
        sentAt: "2025-01-31T11:09:20.000Z",
        attachments: [],
      },
      {
        id: 10,
        roomId: 1,
        sender: {
          id: 3,
          nickname: "민수",
        },
        message: "유럽 여행은 어때? 문화도 다양하고 좋더라구.",
        sentAt: "2025-01-31T11:10:30.000Z",
        attachments: [],
      },
      {
        id: 11,
        roomId: 1,
        sender: {
          id: 4,
          nickname: "하늘",
        },
        message: "그리고 결혼식 테마는 정했어?",
        sentAt: "2025-01-31T11:11:40.000Z",
        attachments: [],
      },
      {
        id: 12,
        roomId: 1,
        sender: {
          id: 2,
          nickname: "수진",
        },
        message: "난 클래식한 분위기가 좋을 것 같아.",
        sentAt: "2025-01-31T11:12:50.000Z",
        attachments: [],
      },
      {
        id: 13,
        roomId: 1,
        sender: {
          id: 5,
          nickname: "지훈",
        },
        message: "어쩌면 모던한 스타일도 괜찮을 것 같은데?",
        sentAt: "2025-01-31T11:14:00.000Z",
        attachments: [],
      },
      {
        id: 14,
        roomId: 1,
        sender: {
          id: 1,
          nickname: "은지",
        },
        message: "모두 의견 좋네. 나중에 다 같이 모여서 얘기해보자.",
        sentAt: "2025-01-31T11:15:10.000Z",
        attachments: [],
      },
      {
        id: 15,
        roomId: 1,
        sender: {
          id: 3,
          nickname: "민수",
        },
        message: "그래, 오늘 회의 잘 마무리하자!",
        sentAt: "2025-01-31T11:16:20.000Z",
        attachments: [],
      },
    ],
  };

  console.log(dummyChatMessage);

  // const dummyChatMessage = {
  //   items: [
  //     {
  //       id: 1,
  //       roomId: 1,
  //       sender: {
  //         id: 4,
  //         nickname: "하늘",
  //       },
  //       message: "신부 들러리 역할을 어떻게 준비하고 있나요?",
  //       sentAt: "2025-01-31T11:19:04.233Z",
  //       attachments: [],
  //     },
  //     {
  //       id: 2,
  //       roomId: 1,
  //       sender: {
  //         id: 2,
  //         nickname: "수진",
  //       },
  //       message:
  //         "결혼 준비 Q&A 시간이에요. 궁금한 점 있으신 분들은 질문해주세요.",
  //       sentAt: "2025-01-31T11:29:04.233Z",
  //       attachments: [],
  //     },
  //     {
  //       id: 3,
  //       roomId: 1,
  //       sender: {
  //         id: 5,
  //         nickname: "지훈",
  //       },
  //       message: "결혼식 테마는 무엇으로 정하셨나요?",
  //       sentAt: "2025-01-31T11:39:04.233Z",
  //       attachments: [],
  //     },
  //     {
  //       id: 4,
  //       roomId: 1,
  //       sender: {
  //         id: 1,
  //         nickname: "은지",
  //       },
  //       message: "신혼여행 계획은 어떻게 세우고 계신가요?",
  //       sentAt: "2025-01-31T11:49:04.233Z",
  //       attachments: [],
  //     },
  //     {
  //       id: 5,
  //       roomId: 1,
  //       sender: {
  //         id: 3,
  //         nickname: "민수",
  //       },
  //       message: "결혼식 장소 추천 좀 부탁드립니다!",
  //       sentAt: "2025-01-31T11:59:04.233Z",
  //       attachments: [],
  //     },
  //   ],
  // };

  // 나가기 버튼 클릭 시 이전 페이지로 이동
  const handleLeaveChat = () => {
    navigate(-1); // 이전 페이지로 돌아감
  };

  const handleSend = () => {
    chatSendMutation.mutate(chat);
  };

  return (
    <motion.div
      // 화면 밖 오른쪽에서 시작
      initial={{ x: "100%" }}
      // 중앙으로 슬라이드되어 들어옴
      animate={{ x: 0 }}
      // exit 애니메이션은 필요에 따라 지정 (예: 왼쪽으로 슬라이드하며 사라짐)
      exit={{ x: "-100%" }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
      <div className="p-4">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-3 grid grid-cols-3 items-center mb-3">
          <button
            onClick={handleLeaveChat}
            className="px-4 py-2 text-black rounded justify-self-start"
          >
            &lt;
          </button>

          <h2 className="text-xl font-bold text-center">{roomTitle}</h2>

          <div></div>
        </div>

        <div className="mb-4">
          {dummyChatMessage.items.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <div className="pb-2">
              <MyChatBox
                owner={myId == item.sender.id ? "mine" : "others"}
                message={item.message}
              />
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 flex items-center p-4 bg-white">
          <MyInputWhite
            type="text"
            placeholder="채팅을 입력하세요"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            className="flex-grow"
          />
          <MySendButton className="ml-2" onClick={handleSend} />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatRoomPage;
