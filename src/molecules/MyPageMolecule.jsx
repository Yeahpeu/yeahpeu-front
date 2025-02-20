import { useNavigate } from "react-router-dom";
import bride from "../assets/bride.png";
import groom from "../assets/groom.png";
import { useMyPage } from "../api/mypageAPI";
import { useLogout } from "../api/logoutAPI";
import MyAlert from "../components/Modals/MyAlert";
import { useState } from "react";
import MyConfirm from "../components/Modals/MyConfirm";
import { convertToKST } from "../data/util/timeUtils";

const MyPageMolecule = () => {
  const { data, isLoading } = useMyPage();
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();

  const [alertMessage, setAlertMessage] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleMoveToEdit = () => {
    navigate("/mypage/edit");
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
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

  const sampleImage = data?.weddingRole === "BRIDE" ? bride : groom;

  const formatWeddingDate = (data) => {
    if (!data?.weddingInfoResponse.weddingDay) return "날짜 미정";
    return convertToKST(data.weddingInfoResponse.weddingDay);
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col w-full">
      {alertMessage && (
        <div>
          <MyAlert
            message={alertMessage}
            onConfirm={() => setAlertMessage("")}
          />
        </div>
      )}

      {showLogoutConfirm && (
        <div>
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

      <div className="mt-6"></div>

      {/* <div className="flex items-center justify-center px-8 py-4 mb-4 border-b shadow-sm bg-white rounded-b-lg">
        <h1 className="text-xl font-bold text-center">내 정보</h1>
      </div> */}
      <div className="mx-5 px-5 py-3 bg-red-100 shadow-lg rounded-lg border">
        <div className="flex flex-row items-center gap-10 my-2">
          <div className="flex flex-col items-center gap-2">
            <img
              src={data?.avatarUrl || sampleImage}
              alt="프로필 이미지"
              className="rounded-full w-16 h-16 object-cover bg-white"
            />
          </div>
          <div className="flex flex-col gap-1 w-2/3 items-start text-left ">
            <div className="flex flex-row gap-2 w-full my-2 ">
              {data?.weddingRole === "BRIDE" ? (
                <span className="font-semibold text-gray-700 w-1/4">신부</span>
              ) : (
                <span className="font-semibold text-gray-700 w-1/4">신랑</span>
              )}
              <div className="w-1/2 text-left">{data?.username}</div>
            </div>

            <div className="flex flex-row items-center gap-2 w-full mb-1">
              <span className="font-semibold text-gray-700 w-1/4">별명</span>
              <div className="w-1/2 text-left">{data?.nickname}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col justify-center gap-4 my-2 ">
            <div className="flex flex-row items-center gap-4 mt-2">
              <span className="font-semibold text-gray-700 w-1/4 text-left">
                초대 코드
              </span>
              <span>{data?.myCode}</span>
            </div>
            <div className="flex flex-row items-center gap-4">
              <span className="font-semibold text-gray-700 w-1/4 text-left">
                이메일
              </span>
              <span {...{ "x-apple-data-detectors": "false" }}>
                {data?.emailAddress}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-col justify-center gap-4 my-2 px-8 py-4">
          <div className="flex flex-row items-center gap-6">
            <span className="font-semibold text-gray-700 w-1/3 text-left">
              배우자
            </span>
            <span>
              {data?.weddingInfoResponse.partnerName === null ? (
                <span className="text-gray-500">배우자를 초대하세요.</span>
              ) : (
                data?.weddingInfoResponse.partnerName
              )}
            </span>
          </div>
          <div className="flex flex-row items-center gap-6">
            <span className="font-semibold text-gray-700 w-1/3 text-left">
              예산
            </span>
            <span>
              {data?.weddingInfoResponse.budget
                ? data.weddingInfoResponse.budget.toLocaleString()
                : "0"}{" "}
              원
            </span>
          </div>
          <div className="flex flex-row items-center gap-6">
            <span className="font-semibold text-gray-700 w-1/3 text-left">
              결혼예정일
            </span>
            <span>{formatWeddingDate(data)}</span>
          </div>
        </div>
      </div>

      <div className="mt-12 px-8 py-4">
        <button
          className="flex flex-row justify-between border-y text-red-300 border-gray-300 px-2 py-2.5 w-full text-sm"
          onClick={handleMoveToEdit}
        >
          <div>회원 정보 수정</div>
          <div> &gt; </div>
        </button>
        <button
          className="flex flex-row justify-between border-b text-red-300 border-gray-300 px-2 py-2.5  w-full text-sm"
          onClick={confirmLogout}
        >
          <div>로그아웃</div>
          <div> &gt; </div>
        </button>
      </div>
    </div>
  );
};

export default MyPageMolecule;
