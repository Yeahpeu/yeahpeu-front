import React, { useState } from "react";
import MySearchBar from "../../components/common/MySearchBar";
import MyChatCard from "../../components/Cards/MyChatCard";
import { useMutation } from "@tanstack/react-query";
import { useProfile } from "../../api/chatAPI";
import chatImg from "../../assets/chat-icon.png";
import { useNavigate } from "react-router-dom";
import MyConfirm from "../../components/Modals/MyConfirm";
import {
  useRooms,
  useJoinRoom,
  useGetChatUsers,
  useUserRooms,
} from "../../api/chatAPI";
import { useChatStore } from "../../stores/chatStore";
import MyCreateChat from "../../components/Modals/MyCreateChat";
import MyEmptyCard from "../../components/Cards/MyEmptyCard";
import defaultChatImg from "../../assets/couple.png";
import MyLoading from "../../components/common/MyLoading";
import MyAlert from "../../components/Modals/MyAlert";

const AllchatMolecule = () => {
  const { data: userRooms = [] } = useRooms();
  const { data: joinedRooms = [] } = useUserRooms();
  const [searchKeyword, setSearchKeyword] = useState("");
  const { data: userProfile = [], isLoading } = useProfile();
  // 선택된 채팅방 ID와 모달 표시 여부를 관리
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUnableModal, setShowUnableModal] = useState(false);
  const { mutate: joinRoom } = useJoinRoom();

  const { roomId, roomTitle, setRoomId, setRoomTitle, setUserId } =
    useChatStore();
  const navigate = useNavigate();

  const handleChatCardClick = (roomId, roomTitle) => {
    setRoomId(roomId);
    setRoomTitle(roomTitle);
    setShowConfirmModal(true);
  };
  // 모달에서 "확인"을 누른 경우: 채팅방으로 이동
  const handleJoinConfirm = () => {
    // 여기서 추가 작업을 할 수 있음
    setShowConfirmModal(false);

    joinRoom(roomId, {
      onSuccess: (data) => {
        //NOTE - 참여 성공 후 유저 정보 조회

        // 참여 성공 후 채팅방 페이지로 이동
        setUserId(userProfile.id);
        navigate(`/chat/mychat/rooms/${roomId}`, {
          state: { roomTitle },
        });
      },
      onError: (error) => {
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

  const handleUnableModal = () => {
    setAlertMessage("채팅방이 가득 찼습니다");
  };

  const [alertMessage, setAlertMessage] = useState("");

  // 검색어가 변경될 때마다 필터링된 결과를 계산
  const filteredUserRooms = userRooms
    .filter(
      (room) =>
        !joinedRooms.items?.some((joinedRoom) => joinedRoom.id === room.id)
    ) // items 배열에서 확인
    .filter((room) =>
      room.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

  if (isLoading) {
    return (
      <div>
        <MyLoading />
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex items-center w-full gap-2">
        <div className="flex-grow">
          <MySearchBar
            value={searchKeyword}
            setValue={setSearchKeyword}
            onSearch={(e) => setSearchKeyword(e.target.value)}
            noSearch={true}
          />
        </div>
      </div>
      <button
        onClick={handleAddChatRoom}
        className="bg-red-50 p-2 text-gray-500 font-bold rounded-full flex items-center justify-center fixed bottom-20 right-5 shadow-lg shadow-slate-300"
      >
        <img src={chatImg} className="h-8 w-8" />
      </button>
      <div className="">
        {filteredUserRooms && filteredUserRooms.length > 0 ? (
          filteredUserRooms.map((item) => (
            <div
              key={item.id}
              onClick={
                item.usedMemberCount >= item.reservedMemberCount
                  ? handleUnableModal
                  : () => handleChatCardClick(item.id, item.title)
              }
            >
              <div className="cursor-pointer active:bg-red-100 hover:bg-red-50 my-2.5">
                <MyChatCard
                  roomTitle={item.title}
                  maxMember={item.reservedMemberCount}
                  currentMember={item.usedMemberCount}
                  imgSrc={item.imageUrl || defaultChatImg}
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

      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <MyAlert
            message={alertMessage}
            onConfirm={() => setAlertMessage("")}
          />
        </div>
      )}
    </div>
  );
};

export default AllchatMolecule;
