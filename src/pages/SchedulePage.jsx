import { Outlet } from "react-router-dom";
import MyTab from "../components/Buttons/MyTab";

const SchedulePage = () => {
  return (
    <div className="p-8">
      <MyTab
        leftValue={"캘린더"}
        leftTo={"calendar"}
        rightValue={"남은 일정"}
        rightTo={"todos"}
      />
      <Outlet />
    </div>
  );
};

export default SchedulePage;
