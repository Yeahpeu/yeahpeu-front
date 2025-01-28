import { useNavigate } from "react-router-dom";

const MyWishSmallCard = ({ images }) => {
  const navigate = useNavigate();

  return (
    <button
      className="bg-white rounded-lg shadow-md p-4 w-full border flex flex-col items-start h-40"
      onClick={() => navigate("/shop/mywish")}
    >
      <p className="text-red-400 text-sm font-semibold">
        위시리스트({images.length})
      </p>
      {images.length > 0 ? (
        <div className="flex space-x-2 mt-2">
          {images.slice(0, 3).map((image, index) => (
            <img
              key={index}
              src={image}
              className="w-1/3 h-auto rounded-lg object-cover shadow"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm mt-4 flex items-center justify-center w-full h-screen">
          신혼집을 채울 혼수를 골라보세요
        </p>
      )}
    </button>
  );
};

export default MyWishSmallCard;
