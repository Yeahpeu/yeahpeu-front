import { Outlet } from "react-router-dom";
import MyTab from "../components/Buttons/MyTab";

const ChatRoomPage = () => {
  return (
    <>
      <MyTab
        leftValue={"모든채팅"}
        leftTo={"allchat"}
        rightValue={"나의 채팅"}
        rightTo={"mychat"}
      />
      <Outlet />
    </>
  );
}

export default ChatRoomPage;
