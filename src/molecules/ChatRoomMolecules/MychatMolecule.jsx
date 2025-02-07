import MyChatCard from "../../components/Cards/MyChatCard";
import { useNavigate } from "react-router-dom";
import emptyImg from "../../assets/emptybox.png";
import { useChatStore } from "../../stores/chatStore.js";
import { useUserRooms, useProfile } from "../../api/chatAPI";
import progressinGIF from "../../assets/progressing.gif";
import MyEmptyCard from "../../components/Cards/MyEmptyCard";

const MychatMolecule = () => {
  const { data: userRooms = [] } = useUserRooms();
  const { data: userProfile = [], isLoading } = useProfile();

  const navigate = useNavigate();
  const { setRoomTitle, setRoomId, setUserId } = useChatStore();

  const handleChatCardClick = (roomId, roomTitle) => {
    console.log(`채팅방 ID ${roomId} 클릭됨`);
    setRoomTitle(roomTitle);
    setRoomId(roomId);
    console.log(userProfile);
    setUserId(userProfile.id);
    navigate(`/chat/mychat/rooms/${roomId}`, { state: { roomTitle } });
  };

  if (isLoading) {
    return (
      <div>
        <img src={progressinGIF} alt="로딩중....." />
      </div>
    );
  }

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
                currentMember={item.usedMemberCount}
                maxMember={item.reservedMemberCount}
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
          <p className="text-gray-500 max-h-screen">
            <MyEmptyCard value={"이용 가능한 채팅방이 없습니다"} />
          </p>
        </div>
      )}
    </div>
  );
};

export default MychatMolecule;
