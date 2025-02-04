import { Outlet } from "react-router-dom";
import MyTab from "../components/Buttons/MyTab";

const ChatPage = () => {
  return (
    <div className="p-8">
      <MyTab
        leftValue={"모든 채팅"}
        leftTo={"allchat"}
        rightValue={"나의 채팅"}
        rightTo={"mychat"}
      />
      <Outlet />
    </div>
  );
};

export default ChatPage;
