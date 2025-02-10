import MyWishAddButton from "../Buttons/MyWishAddButton";
import shareIcon from "../../assets/kakaotalk_sharing_btn.png";
import { useEffect } from "react";
import { shareKakao } from "../../data/util/kakaoshare";

const MyWishCard = ({ item, selected, onWishClick }) => {
  const removeHtmlTags = (str) => str.replace(/<[^>]*>/g, "");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleShareClick = () => {
    shareKakao(item.linkUrl, removeHtmlTags(item.title), item.imageUrl);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-3 w-full border flex items-center space-x-4">
      <a href={item.linkUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={item.imageUrl}
          className="w-20 h-20 rounded-lg object-cover shadow"
        />
      </a>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">{item.mallName}</p>
          <div className="flex items-center gap-2">
            <button onClick={handleShareClick}>
              <img src={shareIcon} className="w-6 h-6" alt="공유하기" />
            </button>
            <MyWishAddButton
              onClick={() => onWishClick(item)}
              isCompleted={selected}
            />
          </div>
        </div>
        <a
          href={item.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm font-bold text-gray-800 pb-1 text-left"
        >
          {removeHtmlTags(item.title)}
        </a>
        <p className="text-gray-800 text-sm text-left">
          {item.price.toLocaleString()} 원
        </p>
      </div>
    </div>
  );
};

export default MyWishCard;
