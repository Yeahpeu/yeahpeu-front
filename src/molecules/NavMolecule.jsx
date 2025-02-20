import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../components/Buttons/NavButtons/HomeIcon";
import CalendarIcon from "../components/Buttons/NavButtons/CalendarIcon";
import ChatIcon from "../components/Buttons/NavButtons/ChatIcon";
import ShopIcon from "../components/Buttons/NavButtons/ShopIcon";
import MyPageIcon from "../components/Buttons/NavButtons/MyPageIcon";
import { useCommonStore } from "../stores/commonStore";
import { useWishStore } from "../stores/wishStore";
import { useEffect } from "react";

const MyNav = () => {
  const { activeIndex, setActiveIndex } = useCommonStore();
  const location = useLocation();
  const { deleteCategory } = useWishStore();
  const navigate = useNavigate();

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const currentPath = pathSegments[1];

    switch (currentPath) {
      case "home":
        setActiveIndex(0);
        break;
      case "chat":
        setActiveIndex(1);
        break;
      case "schedule":
        setActiveIndex(2);
        break;
      case "shop":
        setActiveIndex(3);
        break;
      case "mypage":
        setActiveIndex(4);
        break;
      default:
        break;
    }
  }, [location.pathname, setActiveIndex]);

  if (location.pathname === "/") {
    return null;
  }

  const hidePath = [
    "/login",
    "/signup",
    "/registrationStatus",
    "/onboarding",
    "/chat/mychat/rooms/",
    "/onboarding",
    "/registrationStatus",
  ];

  if (hidePath.some((path) => location.pathname.startsWith(path))) {
    return null;
  }

  const navItems = [
    { id: 0, tab: "홈", label: "home", icon: <HomeIcon /> },
    { id: 1, tab: "채팅", label: "chat/mychat", icon: <ChatIcon /> },
    {
      id: 2,
      tab: "캘린더",
      label: "schedule/calendar",
      icon: <CalendarIcon />,
    },
    { id: 3, tab: "쇼핑", label: "shop/main", icon: <ShopIcon /> },
    { id: 4, tab: "프로필", label: "mypage", icon: <MyPageIcon /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0  w-full h-14 bg-white border-t-2 z-10 rounded-t-2xl  max-w-[430px] mx-auto">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const targetPath = `/${item.label}`;

          return (
            <Link
              to={targetPath}
              key={item.id}
              className={`flex flex-col items-center ${
                activeIndex === item.id ? "text-red-200" : "text-gray-500"
              }`}
              onClick={() => {
                setActiveIndex(item.id);
                if (item.label === "shop/main") {
                  deleteCategory();
                  navigate("/shop/main");
                }
              }}
            >
              <div className="w-6 h-7">{item.icon}</div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MyNav;
