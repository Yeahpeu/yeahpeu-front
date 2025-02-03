import { useState } from "react";
import MyChatCard from "../../components/Cards/MyChatCard";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import emptyImg from "../../assets/emptybox.png";
import { useChatStore } from "../../stores/chatStore.js"; //"../../stores/chatStore"; // store 경로에 맞게 조정

import { useUserRooms } from "../../api/chatAPI";

const MychatMolecule = () => {
  const { data: userRooms = [] } = useUserRooms();

  const navigate = useNavigate();
  const { setRoomTitle, setRoomId } = useChatStore();

  // 선택한 날짜의 이벤트 필터링
  // const filteredEvents = selectedDate
  //   ? events.filter((event) => {
  //       const eventDate = new Date(event.date);
  //       return eventDate.toISOString().split("T")[0] === selectedDate;
  //     })
  //   : [];

  const handleChatCardClick = (roomId, roomTitle) => {
    console.log(`채팅방 ID ${roomId} 클릭됨`);
    setRoomTitle(roomTitle);
    setRoomId(roomId);
    navigate(`/chat/mychat/rooms/${roomId}`, { state: { roomTitle } });
  };

  return (
    <div>
      {userRooms.items && userRooms.items.length > 0 ? (
        userRooms.items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleChatCardClick(item.id, item.title)}
          >
            <div className="cursor-pointer active:bg-red-100 hover:bg-red-50">
              <MyChatCard
                roomTitle={item.title}
                currentMember="500"
                maxMember="1000"
                imgSrc="https://edu.ssafy.com/asset/images/header-logo.jpg" // 필요에 따라 동적으로 변경 가능
                lastMessageText={
                  item.lastMessage
                    ? item.lastMessage.text
                    : "채팅방이 생성되었습니다"
                }
                unseenMessageCount={item.unseenMessageCount}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          {/* 기본 이미지 표시 */}
          <img
            src={emptyImg} // 로컬 이미지 사용 시
            alt="채팅방 없음"
            className="w-[70%] mb-4"
          />
          {/* 또는 외부 이미지 URL 사용 시 */}
          {/* <img
            src="https://via.placeholder.com/150?text=No+Chat+Rooms"
            alt="채팅방 없음"
            className="w-32 h-32 mb-4"
          /> */}
          <p className="text-black-500 text-6xl">텅</p>
          <p className="text-gray-500 text-lg">
            현재 이용 가능한 채팅방이 없습니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default MychatMolecule;
