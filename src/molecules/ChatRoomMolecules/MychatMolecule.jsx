import React, { memo } from "react";
import MyChatCard from "../../components/Cards/MyChatCard";
import { useNavigate } from "react-router-dom";
import emptyImg from "../../assets/emptybox.png";
import { useChatStore } from "../../stores/chatStore.js";
import { useUserRooms, useProfile } from "../../api/chatAPI";
import MyEmptyCard from "../../components/Cards/MyEmptyCard";
import defaultChatImg from "../../assets/couple.png";
import { useState } from "react";
import chatImg from "../../assets/chat-icon.png";
import MyCreateChat from "../../components/Modals/MyCreateChat";
import MyLoading from "../../components/common/MyLoading";
import MyAiChatCard from "../../components/Cards/MyAiChatCard.jsx";
import { useAiStore } from "../../stores/aiStore.js";

const MychatMolecule = () => {
  const { data: userRooms = [] } = useUserRooms();
  const { data: userProfile = [], isLoading } = useProfile();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();
  const { setRoomTitle, setRoomId, setUserId } = useChatStore();
  const AiStore = useAiStore();
  console.log("userRooms", userRooms);
  const handleAddChatRoom = () => {
    setShowCreateModal(true);
  };
  const handleCreateCancel = () => {
    setShowCreateModal(false);
  };
  const handleCreateConfirm = (data) => {
    setShowCreateModal(false);
    setUserId(userProfile.id);
  };
  const handleChatCardClick = (roomId, roomTitle) => {
    setRoomTitle(roomTitle);
    setRoomId(roomId);
    setUserId(userProfile.id);
    navigate(`/chat/mychat/rooms/${roomId}`, { state: { roomTitle } });
  };

  // ai 채팅방으로 이동
  const handleAiChatCardClick = () => {
    AiStore.resetChatMessages();
    AiStore.setChat("");

    navigate(`/chat/mychat/rooms/ai`);
  };

  if (isLoading) {
    return (
      <div>
        <MyLoading />
      </div>
    );
  }

  return (
    <div className="">
      <div
        className="bg-red-50  fixed bottom-36 right-5 shadow-lg shadow-slate-300 rounded-full"
        onClick={() => handleAiChatCardClick()}
      >
        <MyAiChatCard />
      </div>
      {userRooms.items && userRooms.items.length > 0 ? (
        <>
          {userRooms.items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleChatCardClick(item.id, item.title)}
            >
              <div className="cursor-pointer active:bg-red-100 hover:bg-red-50 my-2.5">
                <MyChatCard
                  roomTitle={item.title}
                  currentMember={item.usedMemberCount}
                  maxMember={item.reservedMemberCount}
                  imgSrc={item.imageUrl || defaultChatImg}
                  lastMessageText={
                    item.lastMessage
                      ? item.lastMessage.text
                      : "채팅방이 생성되었습니다"
                  }
                  unseenMessageCount={item.unseenMessageCount}
                />
              </div>
            </div>
          ))}
          <button
            onClick={handleAddChatRoom}
            className="bg-red-50  p-2 text-gray-500 font-bold rounded-full flex items-center justify-center fixed bottom-20 right-5 shadow-lg shadow-slate-300"
          >
            <img src={chatImg} className="h-8 w-8" alt="채팅방 생성" />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          {/* 기본 이미지 표시 */}
          <p className="text-gray-500 max-h-screen">
            <MyEmptyCard value={"이용 가능한 채팅방이 없습니다"} />
          </p>
          <button
            onClick={handleAddChatRoom}
            className="bg-red-100 p-2 text-gray-500 font-bold rounded-full flex items-center justify-center fixed bottom-20 right-5 shadow-lg shadow-slate-300"
          >
            <img src={chatImg} className="h-8 w-8" />
          </button>
        </div>
      )}
      <MyCreateChat
        onCancel={handleCreateCancel}
        onConfirm={handleCreateConfirm}
        visible={showCreateModal}
      />
    </div>
  );
};

export default MychatMolecule;
