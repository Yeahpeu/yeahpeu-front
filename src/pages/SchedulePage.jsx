import { Outlet } from "react-router-dom";
import MyTab from "../components/Buttons/MyTab";

const SchedulePage = () => {
  return (
    <div className="px-8 py-4">
      <MyTab
        leftValue={"캘린더"}
        leftTo={"calendar"}
        rightValue={"남은 일정"}
        rightTo={"todos"}
      />
      <div className="pt-2">
        <Outlet />
      </div>
    </div>
  );
};

export default SchedulePage;
