import { Outlet } from "react-router-dom";
import MyTab from "../components/Buttons/MyTab";

const ChatPage = () => {
  return (
    <div className="relative">
      <div className="sticky top-0 z-10 bg-white p-8 pb-0">
        <MyTab
          leftValue={"모든채팅"}
          leftTo={"allchat"}
          rightValue={"나의 채팅"}
          rightTo={"mychat"}
        />
      </div>
      <div className="p-8 pt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default ChatPage;
