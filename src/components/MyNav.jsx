import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "./NavButtons/HomeIcon";
import CalendarIcon from "./NavButtons/CalendarIcon";
import ChatIcon from "./NavButtons/ChatIcon";
import ShopIcon from "./NavButtons/ShopIcon";

const MyNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { id: 0, label: "home", icon: <HomeIcon /> },
    { id: 1, label: "calendar", icon: <CalendarIcon /> },
    { id: 2, label: "chat", icon: <ChatIcon /> },
    { id: 3, label: "shop", icon: <ShopIcon /> },
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
            onClick={() => setActiveIndex(item.id)}
          >
            <div className="w-6 h-10">{item.icon}</div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MyNav;
