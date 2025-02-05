import MyInputPink from "../components/common/MyInput-pink";
import { useState } from "react";
import { usePostInvitationCode } from "../api/onboardingAPI";
import { useNavigate } from "react-router-dom";

const InvitationCodePage = () => {
  const navigate = useNavigate();
  const [partnerCode, setPartnerCode] = useState("");
  const { mutate: postInvitationCode } = usePostInvitationCode();
  const handleNext = () => {
    postInvitationCode({ partnerCode });
  };

  const handleSkip = () => {
    navigate("/registrationStatus", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center p-4 relative">
        <h1 className="text-xl text-rose-300 font-medium text-center w-full">
          부부 정보
        </h1>
      </header>

      <div className="flex-1 p-6 flex flex-col gap-8">
        <div>
          <h2 className="text-lg mb-4">신랑(신부) 고유코드</h2>
          <MyInputPink
            type="text"
            onChange={(e) => setPartnerCode(e.target.value)}
          />
          <span className="text-sm text-gray-500">
            신부(신랑)의 마이페이지에서 확인하세요
          </span>
        </div>

        <div className="p-6 gap-2 flex flex-col">
          <button
            onClick={handleNext}
            className="w-full py-3 bg-rose-300 text-white rounded-lg font-medium"
          >
            다 음
          </button>
          <button className="text-sm text-gray-500" onClick={handleSkip}>
            건너뛰기
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationCodePage;
