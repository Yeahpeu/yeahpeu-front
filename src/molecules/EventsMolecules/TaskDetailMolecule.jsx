import { useState } from "react";
import MyEditButton from "../../components/common/MyEditButton";
import MyTaskEdit from "../../components/Modals/MyTaskEdit";

const ScheduleDetailMolecule = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="text-left">
      <div className="flex justify-between items-center">
        <h2 className="ml-8 mt-4 font-semibold">확인 목록</h2>
        <MyEditButton onClick={openModal} />
      </div>

      <hr className="mt-3 ml-8" />

      <ul className="list-disc pl-5 mt-4 ml-8">
        {event.checklists.map((item) => (
          <li
            key={item.id}
            className={`mt-3 ${
              item.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {item.name}
          </li>
        ))}
      </ul>

      {isModalOpen && <MyTaskEdit onClose={closeModal} event={event} />}
    </div>
  );
};

export default ScheduleDetailMolecule;
