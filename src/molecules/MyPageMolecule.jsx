import { useNavigate } from "react-router-dom";
import bride from "../assets/bride.png";
import { useMyPage } from "../api/mypageAPI";

const MyPageMolecule = () => {
  const { data, isLoading } = useMyPage();
  const navigate = useNavigate();
  const handleMoveToEdit = () => {
    navigate("/mypage/edit");
  };
  const sampleImage = bride;

  const formatWeddingDate = (data) => {
    const weddingDay = new Date(data.weddingInfoResponse.weddingDay);
    const year = weddingDay.getFullYear();
    const month = String(weddingDay.getMonth() + 1).padStart(2, "0");
    const day = String(weddingDay.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex items-center mb-2">
        <button onClick={() => navigate(-1)} className="text-gray-600 p-2">
          &lt;
        </button>
        <h1 className="text-xl font-bold text-left">내 정보</h1>
      </div>
      <hr className="w-full mb-2" />
      <div className="flex flex-row items-center gap-10 justify-start my-2">
        <img
          src={sampleImage}
          alt="프로필 이미지"
          className="w-16 h-16 rounded-xl"
        />
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row items-center gap-2">
            {data.weddingRole === "BRIDE" ? (
              <span className="font-semibold text-black w-1/2">신부</span>
            ) : (
              <span className="font-semibold text-black w-1/4">신랑</span>
            )}
            <div className="w-">{data.username}</div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <span className="font-semibold text-black w-1/4">별명</span>
            {data.nickname}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 my-2">
        <div className="flex flex-row items-center gap-4">
          <span className="font-semibold text-black w-1/4 text-left">
            고유 번호
          </span>
          <span>{data.myCode}</span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <span className="font-semibold text-black w-1/4 text-left">
            이메일
          </span>
          <span>{data.emailAddress}</span>
        </div>
        <hr className="mt-3 mb-5" />
        <div className="flex flex-row items-center gap-4">
          <span className="font-semibold text-black w-1/4 text-left">
            신랑 정보
          </span>
          <span>
            {data.weddingInfoResponse.partnerName === null ? (
              <span className="text-gray-500">배우자를 초대하세요.</span>
            ) : (
              data.weddingInfoResponse.partnerName
            )}
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <span className="font-semibold text-black w-1/4 text-left">예산</span>
          <span>{data.weddingInfoResponse.budget}</span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <span className="font-semibold text-black w-1/4 text-left">
            결혼 예정일
          </span>
          <span>{formatWeddingDate(data)}</span>
        </div>
      </div>
      <div className="my-10">
        <button
          className="flex flex-row justify-between border border-gray-300 rounded-lg p-2 w-full text-sm my-20"
          onClick={handleMoveToEdit}
        >
          <div>회원 정보 수정</div>
          <div> &gt; </div>
        </button>
      </div>
    </div>
  );
};

export default MyPageMolecule;
