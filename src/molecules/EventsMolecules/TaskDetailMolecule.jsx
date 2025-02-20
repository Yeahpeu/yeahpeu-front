import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import MyAddTaskButton from "../../components/common/MyAddTaskButton";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTask,
} from "../../api/taskAPI";
import { useCategories } from "../../api/scheduleAPI";
import MyDeleteTaskButton from "../../components/common/MyDeleteButton";

const TaskDetailMolecule = ({ event }) => {
  const [checklists, setChecklists] = useState(event.checklists);
  const [newTask, setNewTask] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const { id: eventId } = useParams();
  const queryClient = useQueryClient();

  const { data: customCategories = [] } = useCategories();

  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTask();

  const handleToggleComplete = (taskId) => {
    const updatedTask = checklists.find((item) => item.id === taskId);

    if (!updatedTask) return;

    const updatedCompleted = !updatedTask.completed;

    setChecklists((prev) =>
      prev.map((item) =>
        item.id === taskId ? { ...item, completed: updatedCompleted } : item
      )
    );

    updateTaskMutation.mutate({ eventId, taskId, completed: updatedCompleted });
  };

  const handleAddTask = async () => {
    if (createTaskMutation.isLoading) return;

    if (newTask.trim() === "") {
      setIsAdding(false);
      return;
    }

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

  const handleDeleteTask = (taskId) => {
    setChecklists((prev) => prev.filter((task) => task.id !== taskId));

    deleteTaskMutation.mutate(
      { eventId, taskId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["task", eventId]);
        },
        onError: (error) => {
          console.error(
            "🚨 Error deleting task:",
            error.response?.data || error.message
          );
        },
      }
    );
  };

  return (
    <div className="text-left mb-20">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-700">확인 목록</h2>
        <MyAddTaskButton onClick={() => setIsAdding(true)} />
      </div>

      <hr className="mt-3" />

      <ul className="list-disc mt-4">
        {checklists.map((item) => (
          <li key={item.id} className="mt-3 flex justify-between mr-2">
            <span
              className={`cursor-pointer flex-1 break-all break-words whitespace-pre-wrap overflow-hidden text-gray-700 ${
                item.completed ? "line-through text-gray-500" : ""
              }`}
              style={{
                wordBreak: "break-word",
                overflowWrap: "break-word",
                hyphens: "auto",
              }}
              onClick={() => handleToggleComplete(item.id)}
            >
              {item.name}
            </span>
            <div className="flex-shrink-0">
              <MyDeleteTaskButton onClick={() => handleDeleteTask(item.id)} />
            </div>
          </li>
        ))}
      </ul>

      {isAdding && (
        <div className="mt-2 flex items-center gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="50글자만 입력 가능합니다"
            className="border px-2 py-1 rounded w-full"
            autoFocus
            maxLength={50}
          />
          <button
            onClick={handleAddTask}
            className="py-1 px-2 font-extrabold text-blue-500 text-xs whitespace-nowrap"
            style={{ writingMode: "horizontal-tb" }}
            disabled={createTaskMutation.isLoading}
          >
            추가
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskDetailMolecule;
