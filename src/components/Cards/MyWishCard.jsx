import MyWishAddButton from "../Buttons/MyWishAddButton";
import shareIcon from "../../assets/kakaotalk_sharing_btn.png";
import puppyImg from "../../assets/puppy.png"; // 대체 이미지
import { useEffect } from "react";
import { shareKakao } from "../../data/util/kakaoshare";

const MyWishCard = ({ item, selected, onWishClick }) => {
  // HTML 태그 제거 함수
  const removeHtmlTags = (str = "") => str.replace(/<[^>]*>/g, "");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_SHARE_KAKAO_LINK_KEY);
      }
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleShareClick = () => {
    shareKakao(item?.linkUrl, removeHtmlTags(item?.title), item?.imageUrl);
  };

  // 쇼핑몰 이름 길이 제한
  const mallName =
    item.mallName && item.mallName.length > 8
      ? `${item.mallName.slice(0, 8)}...`
      : item.mallName || "없음";

  // 제목 길이 제한 (50글자)
  const rawTitle = removeHtmlTags(item?.title || "");
  const sliceTitle =
    rawTitle.length > 50 ? rawTitle.slice(0, 62) + "..." : rawTitle;

  // 이미지 src 결정 (없으면 puppyImg 사용)
  const imageSrc = item?.imageUrl || puppyImg;

  return (
    <div className="bg-white rounded-lg shadow-md p-3 w-full border flex items-center space-x-4">
      <a href={item?.linkUrl} target="_blank" rel="noopener noreferrer">
        <div className="w-16 h-16 rounded-lg shadow bg-gray-100 flex items-center justify-center">
          <img
            src={imageSrc}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = puppyImg;
            }}
            className="w-full h-full rounded-lg object-cover"
            alt="이미지"
          />
        </div>
      </a>
      <div className="flex-1">
        <div className="flex justify-between items-center pb-2">
          <p className="text-xs text-gray-500">{mallName}</p>
          <div className="flex items-center gap-2">
            <button onClick={handleShareClick}>
              <img
                src={shareIcon}
                className="w-[22px] h-[22px] mt-0.5"
                alt="공유하기"
              />
            </button>
            <MyWishAddButton
              onClick={() => onWishClick(item)}
              isCompleted={selected}
            />
          </div>
        </div>
        <a
          href={item?.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm font-bold text-gray-700 pb-1 text-left break-all break-words"
        >
          {sliceTitle}
        </a>
        <p className="text-gray-700 text-sm text-left">
          {item?.price.toLocaleString()} 원
        </p>
      </div>
    </div>
  );
};

export default MyWishCard;
