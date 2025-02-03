import coupleImg from "../assets/couple.png";
import MyPageIcon from "../components/Buttons/NavButtons/MyPageIcon";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderMolecule = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="flex flex-row items-center justify-center w-full p-5 top-0 left-0 bg-white relative">
        <img src={coupleImg} alt="Yeahpeu Image" className="w-16 h-16" />
        {location.pathname === "/home" && (
          <button
            onClick={() => navigate("/mypage")}
            className="absolute right-5"
          >
            <MyPageIcon className="w-6 h-6 z-10" />
          </button>
        )}
      </div>
    </>
  );
};

export default HeaderMolecule;
