import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAiStore } from "../stores/aiStore";
import MyConfirm from "../components/Modals/MyConfirm";
import ChatAiHeader from "../components/Chat/ChatAiHeader";
import { useCreateAiJidgeMutation } from "../api/aiAPI";
import TypewriterComponent from "typewriter-effect";
import ChatAiInput from "../components/Chat/ChatAiInput";
import ChatAiMessages from "../components/Chat/ChatAiMessages";

const ChatAiRoomPage = () => {
  const navigate = useNavigate();
  const { chat, setChat, chatMessages, setChatMessages, resetChatMessages } =
    useAiStore();

  const [step, setStep] = useState(1);
  const [userResponses, setUserResponses] = useState({
    cause: "",
    wife: "",
    husband: "",
  });
  useEffect(() => {
    setStep(1);
  }, []);
  const createAiJudge = useCreateAiJidgeMutation();
  const [hasShownMessage, setHasShownMessage] = useState(false);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSend = useCallback(async () => {
    if (!chat?.trim()) return;

    setChatMessages({ isAi: false, message: chat });

    if (step === 1) {
      setUserResponses((prev) => ({ ...prev, cause: chat }));
      setChatMessages({
        isAi: true,
        message: "예비신부의 입장을 말씀해주세요!",
      });
      setStep(2);
    } else if (step === 2) {
      setUserResponses((prev) => ({ ...prev, wife: chat }));
      setChatMessages({
        isAi: true,
        message: "예비신랑의 입장은 어떤가요?",
      });

      setStep(3);
    } else if (step === 3) {
      setUserResponses((prev) => ({ ...prev, husband: chat }));
      setChatMessages({
        isAi: true,
        message: "모든 정보를 입력받았습니다. 판단중...",
      });
      setChat("");
      setStep(4);

      abortControllerRef.current = new AbortController();

      try {
        const response = await createAiJudge.mutateAsync(userResponses, {
          signal: abortControllerRef.current.signal,
        });

        if (!abortControllerRef.current.signal.aborted) {
          await setChatMessages({
            isAi: true,
            message:
              response.data.judge ||
              "AI 응답을 가져오는 중 오류가 발생했습니다.",
          });
          setStep(5);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("요청이 취소되었습니다");
        } else {
          console.error("에러 발생:", error);
        }
      }
    }

    setChat("");
  }, [chat, step, userResponses, createAiJudge, setChat, setChatMessages]);

  const handleLeaveAichat = useCallback(() => {
    if (step === 4) {
      if (!hasShownMessage) {
        setChatMessages({
          isAi: true,
          message: "판결 중에는 자리에 앉아주세요!",
        });
        setHasShownMessage(true);
      }
      return;
    }

    resetChatMessages();
    setChat("");
    navigate(-1);
  }, [
    step,
    hasShownMessage,
    setChatMessages,
    resetChatMessages,
    setChat,
    navigate,
  ]);

  // step이 바뀔 때마다 메시지 표시 상태 초기화
  useEffect(() => {
    setHasShownMessage(false);
  }, [step]);

  return (
    <div className="flex flex-col h-screen max-h-[100dvh] w-full max-w-[430px] fixed inset-0 mx-auto bg-gray-50">
      <ChatAiHeader
        roomTitle="부부갈등 AI 판사 시누이"
        onLeave={handleLeaveAichat}
        // disabled={step === 4 ? true : false}
      />
      <div className="flex-1 overflow-y-auto px-4 pb-4 overscroll-none">
        <ChatAiMessages messages={chatMessages} />
        {step === 5 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => navigate("/pingpong")}
              className="bg-red-200 text-white px-4 py-1 rounded-full hover:bg-red-200 transition-colors font-bold text-lg shadow-md"
            >
              항소하기
            </button>
          </div>
        )}
      </div>
      <div className="pb-[76px]">
        <ChatAiInput
          chat={chat}
          setChat={setChat}
          setChatMessages={setChatMessages}
          onSend={handleSend}
          isUsed={step >= 4 ? true : false}
          isDisabled={step >= 4 ? true : false}
          isAnswered={step == 5 ? true : false}
        />
      </div>
      <MyConfirm
        message="정말로 이 방을 떠나시겠습니까?"
        onCancel={() => {}}
        onConfirm={() => navigate(-1)}
        optionLeft="머무르기"
        optionRight="나가기"
        visible={false}
      />
    </div>
  );
};

export default ChatAiRoomPage;
