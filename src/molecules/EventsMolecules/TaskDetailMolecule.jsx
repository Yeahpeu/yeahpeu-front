import { useState } from "react";
import MyAddTaskButton from "../../components/common/MyAddTaskButton";
import { useParams } from "react-router-dom";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTask,
} from "../../api/taskAPI";
import { useCategories } from "../../api/scheduleAPI";
import MyDeleteTaskButton from "../../components/common/MyDeleteButton";

const ScheduleDetailMolecule = ({ event }) => {
  const [checklists, setChecklists] = useState(event.checklists);
  const [newTask, setNewTask] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const { id: eventId } = useParams();

  const { data: customCategories = [] } = useCategories();

  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTask();

  const handleToggleComplete = (taskId) => {
    const updatedTasks = checklists.map((item) =>
      item.id === taskId ? { ...item, completed: !item.completed } : item
    );

    setChecklists(updatedTasks);
    updateTaskMutation.mutate({ eventId, updatedTasks });
  };

  const handleAddTask = async () => {
    if (newTask.trim() === "") return;

    try {
      const response = await createTaskMutation.mutateAsync({
        eventId,
        name: newTask,
      });

      const newItem = {
        id: response.id,
        name: newTask,
        completed: false,
      };

      setChecklists((prev) => [...prev, newItem]);
      setNewTask("");
      setIsAdding(false);
    } catch (error) {
      console.error("🚨 Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTaskMutation.mutateAsync({ eventId, taskId });
      setChecklists((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("🚨 Error deleting task:", error);
    }
  };

  return (
    <div className="text-left">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">확인 목록</h2>
        <MyAddTaskButton onClick={() => setIsAdding(true)} />
      </div>

      <hr className="mt-3" />

      <ul className="list-disc pl-5 mt-4 ">
        {checklists.map((item) => (
          <li key={item.id} className="mt-3 flex justify-between mr-2">
            <span
              className={`cursor-pointer ${
                item.completed ? "line-through text-gray-500" : ""
              }`}
              onClick={() => handleToggleComplete(item.id)}
            >
              {item.name}
            </span>
            <MyDeleteTaskButton onClick={() => handleDeleteTask(item.id)} />
          </li>
        ))}
      </ul>

      {isAdding && (
        <div className="mt-2 pl-3 flex items-center gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="새 항목 추가"
            className="border px-2 py-1 rounded w-full"
            autoFocus
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            👌
          </button>
        </div>
      )}
    </div>
  );
};

export default ScheduleDetailMolecule;
