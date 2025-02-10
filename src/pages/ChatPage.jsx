import { Outlet } from "react-router-dom";
import MyTab from "../components/Buttons/MyTab";

const ChatPage = () => {
  return (
    <div className="p-8">
      <MyTab
        leftValue={"나의 채팅"}
        leftTo={"mychat"}
        rightValue={"모든 채팅"}
        rightTo={"allchat"}
      />
      <Outlet />
    </div>
  );
};

export default ChatPage;
