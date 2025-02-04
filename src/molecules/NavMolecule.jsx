import { Link, useLocation } from "react-router-dom";
import HomeIcon from "../components/Buttons/NavButtons/HomeIcon";
import CalendarIcon from "../components/Buttons/NavButtons/CalendarIcon";
import ChatIcon from "../components/Buttons/NavButtons/ChatIcon";
import ShopIcon from "../components/Buttons/NavButtons/ShopIcon";
import { useCommonStore } from "../stores/commonStore";
import { useEffect } from "react";

const MyNav = () => {
  const { activeIndex, setActiveIndex } = useCommonStore();
  const location = useLocation();
  const pathname = location.pathname;

  if (location.pathname === "/") {
    return null;
  }
  const hidePath = [
    "/login",
    "/signup",
    "/registrationStatus",
    "/onboarding",
    "/chat/mychat/rooms/",
  ];
  if (hidePath.some((path) => location.pathname.startsWith(path))) {
    return null;
  }

  const navItems = [
    { id: 0, tab: "홈", label: "home", icon: <HomeIcon /> },

    {
      id: 1,
      tab: "캘린더",
      label: "schedule/calendar",
      icon: <CalendarIcon />,
    },
    { id: 2, tab: "채팅", label: "chat/allchat", icon: <ChatIcon /> },
    { id: 3, tab: "쇼핑", label: "shop", icon: <ShopIcon /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full m-0 bg-white shadow-lg z-10">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <Link
            to={`/${item.label}`}
            key={item.id}
            className={`flex flex-col items-center ${
              activeIndex === item.id ? "text-red-200" : "text-gray-500"
            }`}
            onClick={() => {
              setActiveIndex(item.id);
            }}
          >
            <div className="w-6 h-10">{item.icon}</div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MyNav;
