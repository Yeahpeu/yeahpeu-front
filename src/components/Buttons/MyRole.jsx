import brideImg from "../../assets/bride.png";
import groomImg from "../../assets/groom.png";

const MyRoleButton = ({ selectedRole, onClick }) => {
  return (
    <div className="flex justify-between items-center p-2 space-x-4 w-[80%] mx-auto transition">
      <button
        onClick={() => onClick("BRIDE")}
        className={`p-4 rounded-full ${
          selectedRole === "BRIDE" ? "bg-red-100" : "bg-transparent"
        }`}
      >
        <img src={brideImg} />
      </button>

      <button
        onClick={() => onClick("GROOM")}
        className={`p-4 rounded-full ${
          selectedRole === "GROOM" ? "bg-red-100" : "bg-transparent"
        }`}
      >
        <img src={groomImg} />
      </button>
    </div>
  );
};

export default MyRoleButton;
