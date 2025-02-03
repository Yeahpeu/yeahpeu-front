import { useState } from "react";
import axios from "axios";

const MyTaskEdit = ({ onClose, eventId }) => {
  const [tasks, setTasks] = useState([{ name: "", completed: false }]); // 초기 체크리스트

  // 입력 값 변경 처리
  const handleChange = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].name = value;
    setTasks(updatedTasks);
  };

  // 새로운 항목 추가
  const handleAddTask = () => {
    setTasks([...tasks, { name: "", completed: false }]);
  };

  // API로 데이터 전송
  const handleSubmit = async () => {
    try {
      await axios.post(`/api/v1/wedding/events/${eventId}`, {
        checklists: tasks,
      });
      alert("체크리스트가 성공적으로 추가되었습니다.");
      onClose(); // 완료 후 모달 닫기
    } catch (error) {
      alert(`추가 실패: ${error.response?.data?.message || "알 수 없는 오류"}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-80 relative">
        <h2 className="text-lg font-bold mb-4">확인 목록</h2>

        {tasks.map((task, index) => (
          <div key={index} className="flex items-center mb-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {
                const updatedTasks = [...tasks];
                updatedTasks[index].completed = !task.completed;
                setTasks(updatedTasks);
              }}
              className="mr-2"
            />
            <input
              type="text"
              value={task.name}
              onChange={(e) => handleChange(index, e.target.value)}
              className="border border-gray-300 rounded-md p-1 w-full"
              placeholder="항목 입력"
            />
          </div>
        ))}

        <button
          onClick={handleAddTask}
          className="text-gray-500 text-xl absolute top-4 right-4"
        >
          ＋
        </button>

        <div className="flex justify-between gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-200 text-white rounded-md"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyTaskEdit;
