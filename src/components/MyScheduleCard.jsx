import MyCompleteButton from "./MyCompleteButton";

const MyScheduleCard = ({
  title,
  location,
  time,
  onClick,
  category,
  isCompleted,
  doneComplete,
}) => {
  const categoryColors = {
    결혼식: "bg-[#FF85EB]",
    스드메: "bg-[#AB92FF]",
    예물예단: "bg-[#A6F2FF]",
    신혼집: "bg-[#FFE748]",
    신혼여행: "bg-[#FF9447]",
  };
  const locationName =
    location.length > 10 ? `${location.slice(0, 10)}...` : location;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full flex items-center justify-between border relative">
      <div className="absolute top-4 right-6">
        <MyCompleteButton isCompleted={isCompleted} onClick={doneComplete} />
      </div>

      <div className="flex items-center space-x-3">
        <div
          className={`w-4 h-4 rounded-full ${categoryColors[category]}`}
        ></div>
        <div onClick={onClick} className="pl-1">
          <div className="font-bold text-lg flex pb-1">{title} </div>
          <div className="text-gray-500 text-sm flex justify-between w-44">
            <span>{locationName}</span>
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyScheduleCard;
