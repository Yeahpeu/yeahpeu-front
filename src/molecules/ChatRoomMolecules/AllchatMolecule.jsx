import React, { useState } from "react";
import MySearchBar from "../../components/common/MySearchBar";
import MyChatCard from "../../components/Cards/MyChatCard";
import { useMutation } from "@tanstack/react-query";
import { useProfile } from "../../api/chatAPI";
import chatImg from "../../assets/chat-icon.png";
import { useNavigate } from "react-router-dom";
import MyConfirm from "../../components/Modals/MyConfirm";
import { useRooms, useJoinRoom } from "../../api/chatAPI";
import { useChatStore } from "../../stores/chatStore";
import MyCreateChat from "../../components/Modals/MyCreateChat";
import progressinGIF from "../../assets/progressing.gif";
import MyEmptyCard from "../../components/Cards/MyEmptyCard";

const AllchatMolecule = () => {
  const { data: userRooms = [] } = useRooms();
  const [searchKeyword, setSearchKeyword] = useState("");
  const { data: userProfile = [], isLoading } = useProfile();

  // 선택된 채팅방 ID와 모달 표시 여부를 관리
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { mutate: joinRoom } = useJoinRoom();

  const { roomId, roomTitle, setRoomId, setRoomTitle, setUserId } =
    useChatStore();
  const navigate = useNavigate();

  const handleChatCardClick = (roomId, roomTitle) => {
    console.log(`채팅방 ID : ${roomId} 클릭됨`);
    console.log(`채팅방 TITLE : ${roomTitle} 클릭됨`);
    setRoomId(roomId);
    setRoomTitle(roomTitle);
    setShowConfirmModal(true);
  };
  // 모달에서 "확인"을 누른 경우: 채팅방으로 이동
  const handleJoinConfirm = () => {
    // 여기서 추가 작업을 할 수 있음
    setShowConfirmModal(false);
    console.log(roomId);

    joinRoom(roomId, {
      onSuccess: (data) => {
        console.log("채팅방 참여 성공:", data);
        // 참여 성공 후 채팅방 페이지로 이동
        setUserId(userProfile.id);
        navigate(`/chat/mychat/rooms/${roomId}`, {
          state: { roomTitle },
        });
      },
      onError: (error) => {
        console.error("채팅방 참여 실패:", error);
        // 실패 시 에러 처리 로직 추가
      },
    });
  };

  // 모달에서 "취소"를 누른 경우: 모달 닫기
  const handleJoinCancel = () => {
    setShowConfirmModal(false);
  };

  // 채팅방 모달 -> 채팅방 생성하기
  const handleCreateConfirm = (data) => {
    // 여기서 추가 작업을 할 수 있음
    setShowCreateModal(false);
    setUserId(userProfile.id);

    // 채팅방 생성하고 해당 채팅방으로 이동
    console.log(data);
    // setRoomTitle(data.title);
    // setRoomId(data.id);
    // navigate(`/chat/mychat/rooms/${roomId}`, {
    //   state: { roomTitle },
    // });
  };

  // 채팅방 모달 닫기
  const handleCreateCancel = () => {
    setShowCreateModal(false);
  };

  //채팅방 모달 열기
  const handleAddChatRoom = () => {
    setShowCreateModal(true);
  };

  // 검색어가 변경될 때마다 필터링된 결과를 계산
  const filteredUserRooms = userRooms.filter((item) =>
    item.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  if (isLoading) {
    return (
      <div>
        <img src={progressinGIF} alt="로딩중....." />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center w-full gap-2">
        <div className="flex-grow">
          <MySearchBar
            value={searchKeyword}
            setValue={setSearchKeyword}
            onSearch={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddChatRoom}
          className="bg-red-100 p-2 text-gray-500 font-bold rounded-full flex items-center justify-center"
        >
          <img src={chatImg} className="h-4 w-4" />
        </button>
      </div>
      <div className="">
        {filteredUserRooms && filteredUserRooms.length > 0 ? (
          filteredUserRooms.map((item) => (
            <div
              key={item.id}
              onClick={() => handleChatCardClick(item.id, item.title)}
            >
              <div className="cursor-pointer active:bg-red-100 hover:bg-red-50">
                <MyChatCard
                  roomTitle={item.title}
                  maxMember={item.reservedMemberCount}
                  currentMember={item.usedMemberCount}
                  imgSrc="https://edu.ssafy.com/asset/images/header-logo.jpg"
                  lastMessageText=""
                  unseenMessageCount={0}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-10">
            {/* 기본 이미지 표시 */}
            <p className="text-gray-500 max-h-screen">
              <MyEmptyCard value={"이용 가능한 채팅방이 없습니다"} />
            </p>
          </div>
        )}
      </div>
      <MyConfirm
        message="방에 참여하시겠습니까?"
        onCancel={handleJoinCancel}
        onConfirm={handleJoinConfirm}
        optionLeft="취소"
        optionRight="참여"
        visible={showConfirmModal}
      />

      <MyCreateChat
        onCancel={handleCreateCancel}
        onConfirm={handleCreateConfirm}
        visible={showCreateModal}
      />
    </div>
  );
};

export default AllchatMolecule;
