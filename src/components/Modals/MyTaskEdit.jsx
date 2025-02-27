import { useState } from "react";
import MyInputWhite from "../common/MyInput-white";
import MyButton from "../common/MyButton";
import { useCreateTaskMutation } from "../../api/taskAPI";

const MyTaskEdit = ({ onClose, eventId }) => {
  const [tasks, setTasks] = useState([{ name: "", completed: false }]);
  const { mutate: createTask, isLoading } = useCreateTaskMutation();

  // 입력 값 변경 처리
  const handleChange = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].name = value;
    setTasks(updatedTasks);
  };

  // 새로운 항목 추가
  const handleAddTask = () => {
    if (tasks.length > 0 && tasks[tasks.length - 1].name.trim() === "") {
      setTasks(tasks.slice(0, tasks.length - 1));
    } else {
      setTasks([...tasks, { name: "", completed: false }]);
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // API 호출
  const handleSubmit = () => {
    createTask(
      { eventId, tasks },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-80 relative">
        <h2 className="text-lg font-bold mb-4">확인 목록</h2>

        {tasks.map((task, index) => (
          <div key={index} className="flex items-center mb-3">
            <MyInputWhite
              type="text"
              placeholder="확인 목록록 입력"
              value={task.name}
              onChange={(e) => handleChange(index, e.target.value)}
            />
            <button
              onClick={() => handleRemoveTask(index)}
              className="text-red-400"
            >
              -
            </button>
          </div>
        ))}

        <button
          onClick={handleAddTask}
          className="text-gray-500 text-xl absolute top-4 right-4"
        >
          ＋
        </button>

        <div className="flex justify-between gap-2 mt-4">
          <MyButton
            value="취소"
            color="disabled"
            disabled="abled"
            onClick={onClose}
          />

          <MyButton
            value="완료"
            color="abled"
            disabled="abled"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default MyTaskEdit;
