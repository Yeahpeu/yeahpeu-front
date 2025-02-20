import { Outlet } from "react-router-dom";
import MyTab from "../components/Buttons/MyTab";

const ChatPage = () => {
  return (
    <div className="px-8 py-4">
      <MyTab
        leftValue={"나의 채팅"}
        leftTo={"mychat"}
        rightValue={"모든 채팅"}
        rightTo={"allchat"}
      />
      <div className="pt-1">
        <Outlet />
      </div>
    </div>
  );
};

export default ChatPage;
