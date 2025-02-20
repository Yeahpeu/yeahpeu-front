import MyInputPink from "../components/common/MyInput-pink";
import { useState } from "react";
import { usePostInvitationCode } from "../api/onboardingAPI";
import MyAlert from "../components/Modals/MyAlert";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../api/logoutAPI";
import MyConfirm from "../components/Modals/MyConfirm";

const InvitationCodePage = () => {
  const navigate = useNavigate();
  const [partnerCode, setPartnerCode] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { mutate: postInvitationCode } = usePostInvitationCode();

  const { mutate: logout } = useLogout();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleNext = () => {
    const trimmedCode = partnerCode.trim();
    if (!trimmedCode) {
      setAlertMessage("초대 코드를 입력해 주세요.");
      return;
    }
    postInvitationCode(
      { partnerCode: trimmedCode },
      {
        onSuccess: () => {
          setAlertMessage("초대 코드 등록이 완료되었습니다!");
          navigate("/home");
        },
        onError: () => {
          setAlertMessage("초대 코드를 다시 확인해 주세요");
        },
      }
    );
  };

  const handleLogout = () => {
    logout(null, {
      onSuccess: () => {
        document.cookie =
          "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/");
      },
      onError: () => {
        setAlertMessage("로그아웃 실패! 다시 시도해 주세요.");
      },
    });
    setShowLogoutConfirm(false);
  };

  const handleSkip = () => {
    navigate("/registrationStatus", { replace: true });
  };

  return (
    <>
      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <MyAlert
            message={alertMessage}
            onConfirm={() => setAlertMessage("")}
          />
        </div>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <MyConfirm
            visible={true}
            message="정말 로그아웃 하시겠습니까?"
            onCancel={() => setShowLogoutConfirm(false)}
            onConfirm={handleLogout}
            optionLeft="취소"
            optionRight="확인"
          />
        </div>
      )}

      <div className="min-h-screen bg-white flex flex-col">
        <header className="flex items-center p-4 relative">
          <h1 className="text-xl text-rose-300 font-medium text-center w-full">
            부부 정보
          </h1>
        </header>

        <div className="flex-1 p-6 flex flex-col gap-8">
          <div>
            <h2 className="text-lg mb-4">신부(신랑) 초대 코드</h2>
            <MyInputPink
              type="text"
              onChange={(e) => setPartnerCode(e.target.value)}
              maxLength={15}
            />
            <span className="text-sm text-gray-500 ">
              신부(신랑)의 마이페이지에서 확인하세요
            </span>
          </div>

          <div className="py-20 gap-2 flex flex-col">
            <button
              onClick={handleNext}
              disabled={!partnerCode.trim()}
              className={`w-full py-3 rounded-lg font-medium ${
                partnerCode.trim()
                  ? "bg-rose-300 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              다 음
            </button>
            <button className="text-sm text-blue-300 mt-3" onClick={handleSkip}>
              건너뛰기
            </button>
          </div>

          <button
            className="text-sm text-gray-300 mt-10"
            onClick={handleLogout}
          >
            로그아웃하기
          </button>
        </div>
      </div>
    </>
  );
};

export default InvitationCodePage;
