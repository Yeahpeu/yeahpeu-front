import { useState } from "react";
import MySearchBar from "../../components/common/MySearchBar";
import MyChatCard from "../../components/Cards/MyChatCard";
import moment from "moment";
import MyAddButton from "../../components/common/MyAddButton";
import { useNavigate } from "react-router-dom";
import emptyImg from "../../assets/emptybox.png";

const AllchatMolecule = () => {
  const navigate = useNavigate();

  const dummychat = {
    items: [
      {
        id: 1,
        title: "결혼 축하방",
        unseenMessageCount: 35,
        lastMessage: {
          sentAt: "2025-01-31T10:05:22.955Z",
          text: "축하드립니다! 행복한 결혼 생활 되세요.",
        },
      },
      {
        id: 2,
        title: "결혼 준비 팁",
        unseenMessageCount: 2,
        lastMessage: {
          sentAt: "2025-01-31T09:15:10.123Z",
          text: "예산 관리를 위한 몇 가지 팁을 공유드립니다.",
        },
      },
      {
        id: 3,
        title: "신혼여행 이야기",
        unseenMessageCount: 8,
        lastMessage: {
          sentAt: "2025-01-30T18:45:00.789Z",
          text: "저희 신혼여행 장소로 발리 다녀왔어요! 추천합니다.",
        },
      },
      {
        id: 4,
        title: "결혼식 사진 공유",
        unseenMessageCount: 3,
        lastMessage: {
          sentAt: "2025-01-29T14:20:55.456Z",
          text: "결혼식 사진을 공유합니다. 모두 봐주세요!",
        },
      },
      {
        id: 5,
        title: "결혼 준비 Q&A",
        unseenMessageCount: 0,
        lastMessage: {
          sentAt: "2025-01-28T12:30:30.000Z",
          text: "궁금한 점이 있으신 분들은 질문해주세요.",
        },
      },
    ],
  };

  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  // 선택한 날짜의 이벤트 필터링
  // const filteredEvents = selectedDate
  //   ? events.filter((event) => {
  //       const eventDate = new Date(event.date);
  //       return eventDate.toISOString().split("T")[0] === selectedDate;
  //     })
  //   : [];

  const handleChatCardClick = (roomId) => {
    console.log(`채팅방 ID ${roomId} 클릭됨`);
    navigate(`/chat/mychat/rooms/${roomId}`);
  };

  return (
    <div>
      {dummychat.items && dummychat.items.length > 0 ? (
        dummychat.items.map((item) => (
          <div key={item.id} onClick={() => handleChatCardClick(item.id)}>
            <div className="cursor-pointer active:bg-red-100 hover:bg-red-50">
              <MyChatCard
                roomTitle={item.title}
                currentMember="500"
                maxMember="1000"
                imgSrc="https://edu.ssafy.com/asset/images/header-logo.jpg" // 필요에 따라 동적으로 변경 가능
                lastMessageText={item.lastMessage.text}
                unseenMessageCount={item.unseenMessageCount}
                onClick={() => handleChatCardClick(item.id)} // 추가적인 클릭 핸들러 로직을 여기에 작성할 수 있습니다.
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

export default AllchatMolecule;
