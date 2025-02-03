import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { getScheduleDetail } from "../api/scheduleAPI";
import TaskDetailMolecule from "./TaskDetailMolecule";
import MyEditButton from "../../components/common/MyEditButton";
import { findCategoryNames } from "../../data/util/findCategoryNames";
import { convertKST } from "../../data/util/timeUtils";

const ScheduleDetailMolecule = ({ onEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 id 가져오기

  //   const [event, setEvent] = useState(null);
  //   const [error, setError] = useState(null);

  //   useEffect(() => {
  //     if (!id) return;

  //     const fetchEvent = async () => {
  //       try {
  //         const data = await getScheduleDetail(id);
  //         setEvent(data);
  //       } catch (err) {
  //         setError(err);
  //       }
  //     };

  //     fetchEvent();
  //   }, [id]);

  //   if (error) return <div className="text-center text-red-500">❌ {error}</div>;

  const event = {
    id: 1,
    title: "부모님 시간",
    date: "2025-04-05T14:00:00Z",
    location: "채플앳논현",
    mainCategoryId: 1,
    subCategoryId: 6,
    price: "200000",
    completed: true,
    checklists: [
      {
        id: 1,
        name: "check1",
        completed: false,
      },
      {
        id: 2,
        name: "check2",
        completed: false,
      },
      {
        id: 3,
        name: "check3",
        completed: true,
      },
    ],
  };

  const { mainCategoryName, subCategoryName } = findCategoryNames(
    event.mainCategoryId,
    event.subCategoryId
  );

  const { date: kstDate, time: kstTime } = convertKST(event.date);

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg text-left border border-gray-200 mb-3">
      <div className="flex items-center justify-between mb-2">
        <button onClick={() => navigate(-1)} className="text-gray-600 p-2">
          &lt;
        </button>
        <h1 className="text-xl font-bold">{event.title}</h1>
        <MyEditButton onClick={() => navigate(`/schedule/todos/edit/${id}`)} />
      </div>
      <hr className="mt-3 mb-5" />

      <div className="flex items-center mb-5 gap-14">
        <span className="font-semibold  text-black">일 자</span>
        <span>{kstDate}</span>
      </div>

      <div className="flex items-center mb-5 gap-14">
        <span className="font-semibold text-black">시 간</span>
        <span>{kstTime}</span>
      </div>

      <div className="flex items-center mb-5 gap-14">
        <span className="font-semibold text-black">위 치</span>
        <span className={event.location ? "text-black" : "text-gray-400"}>
          {event.location || "없음"}
        </span>
      </div>

      <div className="flex items-center mb-5 gap-14">
        <span className="font-semibold text-black">예 산</span>
        <span className={event.price ? "text-black" : "text-gray-400"}>
          {event.price && parseInt(event.price, 10) !== 0
            ? `${parseInt(event.price, 10).toLocaleString()}원`
            : "없음"}
        </span>
      </div>

      <div className="flex items-center mb-16 gap-14">
        <span className="font-semibold text-black">구 분</span>
        <div className="flex items-center gap-12">
          <span>{mainCategoryName}</span>
          <span>{subCategoryName}</span>
        </div>
      </div>

      <div className="mt-6">
        <TaskDetailMolecule event={event} />
      </div>
    </div>
  );
};

export default ScheduleDetailMolecule;
