import MyEditButton from "../../components/common/MyEditButton";

const ScheduleDetailMolecule = ({ event }) => {
  return (
    <div className="text-left">
      <div className="flex justify-between items-center">
        <h2 className="mt-4 font-semibold"> 확인 목록</h2>
        <MyEditButton />
      </div>
      <hr className="mt-3" />
      <ul className="list-disc pl-5 mt-4">
        {event.checklists.map((item) => (
          <li
            key={item.id}
            className={`mt-3 ${item.completed ? "line-through text-gray-500" : ""}`}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleDetailMolecule;
