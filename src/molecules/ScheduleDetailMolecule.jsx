import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { getScheduleDetail } from "../api/scheduleAPI";

const ScheduleDetailMolecule = () => {
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
    title: "부모님 시간 일정 맞추기4",
    date: "2025-04-05T14:00:00Z",
    location: "채플앳논현",
    mainCategoryId: 1,
    subcategoryId: 6,
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

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">{event.title}</h1>
      <p>
        <strong>날짜:</strong> {event.date.split("T")[0]}
      </p>
      <p>
        <strong> 시간:</strong>{" "}
        {new Date(event.date).toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </p>
      <p>
        <strong> 위치:</strong> {event.location || "없음"}
      </p>
      <p>
        <strong> 예산:</strong> {parseInt(event.price, 10).toLocaleString()}원
      </p>
      <p>
        <strong> 구분:</strong>{" "}
        {event.subcategoryId === 6 ? "결혼식" : "상견례"}
      </p>

      <h2 className="mt-4 font-semibold"> 확인 목록</h2>
      <hr />
      <ul className="list-disc pl-5 mt-2">
        {event.checklists.map((item) => (
          <li
            key={item.id}
            className={`mt-1 ${item.completed ? "line-through text-gray-500" : ""}`}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleDetailMolecule;
