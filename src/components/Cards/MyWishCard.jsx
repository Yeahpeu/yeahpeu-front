import MyWishAddButton from "../Buttons/MyWishAddButton";
import shareIcon from "../../assets/kakaotalk_sharing_btn.png";

const MyWishCard = ({ item, onShareClick, onWishClick }) => {
  const removeHtmlTags = (str) => str.replace(/<[^>]*>/g, "");

  return (
    <div className="bg-white rounded-lg shadow-md p-3 w-full border flex items-center space-x-4">
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        <img
          src={item.image}
          className="w-20 h-20 rounded-lg object-cover shadow"
        />
      </a>
      <div> </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 pb">{item.maker}</p>
          <div className="flex items-center gap-2 pb-2">
            <button onClick={() => onShareClick(item)}>
              <img src={shareIcon} className="w-6 h-6" />
            </button>
            <MyWishAddButton onClick={() => onWishClick(item)} />
          </div>
        </div>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm font-bold text-gray-800 pb-1"
        >
          {removeHtmlTags(item.title)}
        </a>
        <p className="text-gray-800 text-xs">
          ₩ {item.lprice.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default MyWishCard;
