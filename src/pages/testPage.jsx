import { useNavigate } from "react-router-dom";
import BtnGroup from "../molecules/BtnGroup";

const TestPage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/test-result");
  };

  return (
    <div className="w-full h-[200px] bg-slate-100">
      <p>test page</p>
      <BtnGroup onClick={handleNavigate} />
    </div>
  );
};

export default TestPage;
