import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import MyInputWhite from "../components/common/MyInput-white";
import MyButton from "../components/common/MyButton";
import bride from "../assets/bride.png";
import groom from "../assets/groom.png";
import useMypageStore from "../stores/mypageStore";
import {
  useMyPage,
  useMyPageMutation,
  useAvatarUpload,
} from "../api/mypageAPI";
import { usePostInvitationCode, useFindPartner } from "../api/onboardingAPI";
import imageCompression from "browser-image-compression";
import MyConfirm from "../components/Modals/MyConfirm";
import MyAlert from "../components/Modals/MyAlert";
import { useWithdraw } from "../api/logoutAPI";
import CuteCalendarPopup from "../components/common/CuteCalendarPopup";
import { convertUTC, convertToKST } from "../data/util/timeUtils";
import { QueryClient } from "@tanstack/react-query";

const MyPageEditMolecule = () => {
  const {
    avatarUrl,
    setAvatarUrl,
    username,
    setUsername,
    nickname,
    setNickname,
    budget,
    setBudget,
    weddingRole,
    weddingDay,
    setWeddingDay,
    partnerName,
    setPartnerName,
    myCode,
    emailAddress,
  } = useMypageStore();
  const userInfo = {
    avatarUrl,
    username,
    nickname,
    budget,
    weddingDay,
  };

  const myPageMutation = useMyPageMutation();
  const avatarUpload = useAvatarUpload();
  const { isLoading } = useMyPage();
  const postInvitation = usePostInvitationCode();
  const { mutate: withdrawMutate } = useWithdraw();
  const { mutate: findPartner } = useFindPartner();

  const navigate = useNavigate();
  const sampleImage = weddingRole === "BRIDE" ? bride : groom;

  // 뒤로가기 확인 모달
  const [showConfirm, setShowConfirm] = useState(false);

  // 배우자 초대 관련
  const [partnerInput, setPartnerInput] = useState("");
  const [showPartnerConfirm, setShowPartnerConfirm] = useState(false);
  // findPartner로 받아온 데이터 저장
  const [partnerData, setPartnerData] = useState(null);

  // 회원 탈퇴 확인 모달
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);

  // Alert 모달 메시지 및 페이지 이동 여부 flag
  const [alertMessage, setAlertMessage] = useState("");
  const [alertRedirect, setAlertRedirect] = useState(false);

  //  convertToKST 함수를 사용해 KST 날짜로 표시합니다.
  const formattedWeddingDay = weddingDay ? convertToKST(weddingDay) : "";

  // 이미지 업로드
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 1, // 최대 파일 크기 1MB
        maxWidthOrHeight: 1024, // 최대 너비/높이
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      const convertedFile = new File([compressedFile], file.name, {
        type: file.type,
        lastModified: new Date().getTime(),
      });

      await avatarUpload.mutateAsync(convertedFile);
    } catch (error) {
      setAlertMessage("이미지 업로드에 실패했습니다.");
      setAlertRedirect(false);
    }
  };

  const handleWithdraw = () => {
    withdrawMutate(null, {
      onSuccess: () => {
        document.cookie =
          "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setAlertMessage("회원 탈퇴가 완료되었습니다.");
        setAlertRedirect(true);
      },
      onError: () => {
        setAlertMessage("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
        setAlertRedirect(false);
      },
    });
    setShowWithdrawConfirm(false);
  };

  const handleFindPartner = useCallback(() => {
    if (partnerInput.trim() === "") return;
    findPartner(
      { partnerCode: partnerInput },
      {
        onSuccess: (data) => {
          if (data.weddingRole === weddingRole) {
            setAlertMessage("초대 코드를 다시 확인하세요");
            setAlertRedirect(false);
          } else {
            setPartnerData(data);
            setShowPartnerConfirm(true);
          }
        },
        onError: () => {
          setAlertMessage("초대 코드를 다시 확인하세요");
          setAlertRedirect(false);
        },
      }
    );
  }, [partnerInput, weddingRole, findPartner]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col w-full gap-2">
      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <MyAlert
            message={alertMessage}
            onConfirm={() => {
              setAlertMessage("");
              if (alertRedirect) {
                navigate("/");
                setAlertRedirect(false);
              }
            }}
          />
        </div>
      )}

      <div className="relative flex items-center justify-center mb-2">
        <button
          onClick={() => setShowConfirm(true)}
          className="absolute left-0 text-gray-600 p-2"
        >
          &lt;
        </button>
        <h1 className="text-xl font-bold">내 정보 수정하기</h1>
      </div>

      <hr className="w-full mb-2" />

      {/* 프로필 이미지 및 닉네임 수정 */}
      <div className="flex flex-row items-center gap-10 my-2">
        <div className="flex flex-col items-center gap-2">
          <label
            htmlFor="avatar-upload"
            className="cursor-pointer w-16 h-16 flex-shrink-0 overflow-hidden rounded-full shadow"
          >
            <img
              src={avatarUrl || sampleImage}
              alt="프로필 이미지"
              className={`w-full h-full object-cover ${
                avatarUpload.isPending ? "opacity-50" : "hover:opacity-80"
              }`}
            />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="avatar-upload"
            disabled={avatarUpload.isPending}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            {weddingRole === "BRIDE" ? (
              <span className="font-semibold text-gray-700 w-1/4">신부</span>
            ) : (
              <span className="font-semibold text-gray-700 w-1/4">신랑</span>
            )}
            <MyInputWhite
              type="text"
              value={username}
              onChange={(e) => {
                let inputValue = e.target.value;
                // 최대 5자
                if (inputValue.length > 5) {
                  inputValue = inputValue.substring(0, 5);
                }
                setUsername(inputValue);
              }}
              className="text-xs"
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <span className="font-semibold text-gray-700 w-1/4">별명</span>
            <MyInputWhite
              value={nickname}
              onChange={(e) => {
                let inputValue = e.target.value;
                // 최대 10자
                if (inputValue.length > 10) {
                  inputValue = inputValue.substring(0, 10);
                }
                setNickname(inputValue);
              }}
              className="text-xs"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-5 my-2">
        <div className="flex flex-row items-center gap-5">
          <span className="font-semibold text-gray-700 w-1/4 text-left">
            초대 코드
          </span>
          <span>{myCode}</span>
        </div>
        <div className="flex flex-row items-center gap-5">
          <span className="font-semibold text-gray-700 w-1/4 text-left">
            이메일
          </span>
          <span>{emailAddress}</span>
        </div>
        <hr className="mt-3 mb-5" />

        <div className="flex flex-row items-center gap-5">
          <span className="font-semibold text-gray-700 w-1/4 text-left">
            배우자
          </span>
          <div className="w-1/2 text-left">
            {partnerName === null ? (
              <span>
                <div className="flex flex-row items-center">
                  <MyInputWhite
                    type="text"
                    name="partner"
                    value={partnerInput}
                    onChange={(e) => {
                      let inputValue = e.target.value;
                      if (inputValue.length > 15) {
                        inputValue = inputValue.substring(0, 15);
                      }
                      setPartnerInput(inputValue);
                    }}
                    placeholder="초대 코드 입력"
                    className="border border-gray-300 rounded-md p-2 text-xs"
                  />
                </div>
              </span>
            ) : (
              partnerName
            )}
          </div>

          {!partnerName && (
            <button
              onClick={handleFindPartner}
              disabled={partnerInput.trim() === ""}
              className={`text-blue-500 ${
                partnerInput.trim() === ""
                  ? "opacity-50 cursor-not-allowed text-xs"
                  : ""
              }`}
            >
              확인
            </button>
          )}
        </div>

        <div className="flex flex-row items-center gap-5">
          <span className="font-semibold text-gray-700 w-1/4 text-left">
            예산
          </span>
          <div className="w-1/2">
            <MyInputWhite
              type="text"
              inputMode="numeric"
              pattern="^[0-9]*$"
              name="budget"
              value={budget === 0 ? "" : budget.toLocaleString()}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, "");
                const numericValue = Number(rawValue);
                if (
                  !isNaN(numericValue) &&
                  numericValue >= 0 &&
                  numericValue <= 999999999
                ) {
                  setBudget(numericValue);
                }
              }}
              className="border border-gray-300 rounded-md p-2 w-full text-xs"
              placeholder="10억 미만"
            />
          </div>
        </div>

        {/* 달력 컴포넌트: 선택한 날짜를 KST(YYYY-MM-DD)로 받지만 저장 시 UTC로 변환 */}
        <div className="flex flex-row items-center gap-5">
          <span className="font-semibold text-gray-700 w-1/4 text-left">
            결혼예정일
          </span>
          <div className="w-1/2 ">
            <CuteCalendarPopup
              initialDate={formattedWeddingDay}
              onDateSelect={(selectedDate) => {
                const utcDate = convertUTC(selectedDate, "00:00");
                setWeddingDay(utcDate);
              }}
              containerClass="absolute -right-9 bottom-full mb-2 "
              inputClass="text-xs"
            />
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="px-5 flex flex-row justify-between rounded-lg w-full text-sm my-7">
          <button
            className="text-gray-400"
            onClick={() => setShowWithdrawConfirm(true)}
          >
            회원 탈퇴
          </button>

          <button
            className="font-semibold text-red-500"
            onClick={() => {
              const trimmedUsername = username.trim();
              const trimmedNickname = nickname.trim();
              if (!trimmedUsername || !trimmedNickname) {
                setAlertMessage("사용자명과 별명은 공백일 수 없습니다.");
                setAlertRedirect(false);
                return;
              }
              myPageMutation.mutate({
                ...userInfo,
                username: trimmedUsername,
                nickname: trimmedNickname,
              });
            }}
          >
            수정 완료
          </button>
        </div>
      </div>

      <MyConfirm
        message={
          <>
            변경사항이 저장되지 않습니다.
            <br />
            뒤로 가시겠습니까?
          </>
        }
        optionLeft="취소"
        optionRight="확인"
        visible={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => navigate(-1)}
      />

      <MyConfirm
        message={
          <>
            <div className="flex items-center justify-center pb-2">
              <p className="text-red-900 mr-4 text-lg">
                {partnerData?.weddingRole === "BRIDE" ? "신부" : "신랑"}
              </p>
              <p className="text-red-900 text-lg">{partnerData?.name}</p>
            </div>
            <br />
            <p>{partnerData?.name} 님의 일정으로 들어갑니다.</p>
            <p>배우자 정보는 수정이 불가합니다.</p>
          </>
        }
        optionLeft="취소"
        optionRight="등록"
        visible={showPartnerConfirm}
        onCancel={() => {
          setShowPartnerConfirm(false);
          setPartnerData(null);
        }}
        onConfirm={() => {
          postInvitation.mutate(
            { partnerCode: partnerInput },
            {
              onSuccess: () => {
                setPartnerName(partnerData?.name);
              },
              onError: () => {
                setAlertMessage("초대 코드를 다시 확인하세요");
                setAlertRedirect(false);
              },
            }
          );
          setShowPartnerConfirm(false);
        }}
      />

      <MyConfirm
        message="정말 회원 탈퇴하시겠습니까?"
        optionLeft="취소"
        optionRight="탈퇴"
        visible={showWithdrawConfirm}
        onCancel={() => setShowWithdrawConfirm(false)}
        onConfirm={handleWithdraw}
      />
    </div>
  );
};

export default MyPageEditMolecule;
