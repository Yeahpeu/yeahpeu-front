import { useNavigate } from "react-router-dom";
import BtnGroup from "../molecules/BtnGroup";

const TestPage = () => {
  const navigate = useNavigate();
  //NOTE - useNavigate는 react router의 페이지 전환 함수
  // Link는 a 같은 태그 형식, useNavigate는 함수 형식
  const handleNavigate = () => {
    navigate("/test-result");
  };

  return (
    <div className="w-full h-[200px] bg-slate-100">
      <p>test page</p>
      {/* //NOTE - handleNavigate라는 함수를 생성해서 props방식으로 하위 버튼들로 전달 */}
      <BtnGroup onClick={handleNavigate} width={"20"} />
    </div>
  );
};

export default TestPage;
