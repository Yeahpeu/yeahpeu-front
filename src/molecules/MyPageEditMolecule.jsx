import { useNavigate } from "react-router-dom";
import MyInputWhite from "../components/common/MyInput-white";
import bride from "../assets/bride.png";
import groom from "../assets/groom.png";
import useMypageStore from "../stores/mypageStore";
import {
  useMyPage,
  useMyPageMutation,
  useAvatarUpload,
} from "../api/mypageAPI";
import imageCompression from "browser-image-compression";

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

  const navigate = useNavigate();
  const sampleImage = weddingRole === "BRIDE" ? bride : groom;

  const formattedWeddingDay = weddingDay
    ? new Date(weddingDay).toISOString().split("T")[0]
    : "";

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

      // Blob을 File 객체로 변환
      const convertedFile = new File([compressedFile], file.name, {
        type: file.type,
        lastModified: new Date().getTime(),
      });

      await avatarUpload.mutateAsync(convertedFile);
    } catch (error) {
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex items-center mb-2">
        <button onClick={() => navigate(-1)} className="text-gray-600 p-2">
          &lt;
        </button>
        <h1 className="text-xl font-bold text-left">내 정보</h1>
        <div className="ml-auto mr-1">
          <button
            className="text-red-200 font-semibold"
            onClick={() => myPageMutation.mutate(userInfo)}
          >
            완료
          </button>
        </div>
      </div>

      <hr className="w-full mb-2" />
      <div className="flex flex-row items-center gap-10 my-2">
        <div className="flex flex-col items-center gap-2">
          <img
            src={avatarUrl || sampleImage}
            alt="프로필 이미지"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="avatar-upload"
              disabled={avatarUpload.isPending}
            />
            <label
              htmlFor="avatar-upload"
              className={`text-gray-600 text-xs cursor-pointer hover:text-gray-800 ${
                avatarUpload.isPending ? "opacity-50" : ""
              }`}
            >
              {avatarUpload.isPending ? "업로드 중" : "업로드"}
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-2">
            {weddingRole === "BRIDE" ? (
              <span className="font-semibold text-black w-1/4">신부</span>
            ) : (
              <span className="font-semibold text-black w-1/4">신랑</span>
            )}
            <MyInputWhite
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <span className="font-semibold text-black w-1/4">별명</span>
            <MyInputWhite
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4 my-2">
        <div className="flex flex-row items-center gap-4">
          <span className="font-semibold text-black w-1/4 text-left">
            고유 번호
          </span>
          <span>{myCode}</span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <span className="font-semibold text-black w-1/4 text-left">
            이메일
          </span>
          <span>{emailAddress}</span>
        </div>
        <hr className="mt-3 mb-5" />
        <div className="flex flex-row items-center gap-4">
          <span className="font-semibold text-black w-1/4 text-left">
            배우자 정보
          </span>
          <span>
            {partnerName === null ? (
              <span className="text-gray-500">배우자를 초대하세요.</span>
            ) : (
              partnerName
            )}
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <span className="font-semibold text-black w-1/4 text-left">예산</span>
          <div className="w-1/2">
            <MyInputWhite
              type="number"
              name="budget"
              value={budget === 0 ? "" : budget}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (!isNaN(value) && value >= 0 && value <= 999999999) {
                  setBudget(value);
                }
              }}
              className="border border-gray-300 rounded-md p-2 w-full"
              min={0}
              max={999999999}
              placeholder="10억 미만 "
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <span className="font-semibold text-black w-1/4 text-left">
            결혼 예정일
          </span>
          <div className="w-1/2">
            <MyInputWhite
              type="date"
              value={formattedWeddingDay}
              onChange={(e) => setWeddingDay(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="my-10">
        <button className="p-5 flex flex-row justify-between rounded-lg w-full text-sm my-14">
          <div className="font-semibold">로그아웃</div>
          <div className="text-gray-400">회원 탈퇴</div>
        </button>
      </div>
    </div>
  );
};

export default MyPageEditMolecule;
