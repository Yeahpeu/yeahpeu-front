import { useNavigate } from "react-router-dom";

const MyWishSmallCard = ({ images, total }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <button
        className="bg-white rounded-lg shadow-md p-4 w-full  flex flex-col items-start h-40"
        onClick={() => navigate("/shop/mywish")}
      >
        <div className="flex justify-between items-center w-full">
          <div className="text-red-400 text-sm font-semibold items-center">
            위시리스트({total})
          </div>
          <div className="text-red-400 text-xs font-bold">&gt;</div>
        </div>
        {total > 0 ? (
          <div className="flex mt-2 w-full gap-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                className="w-[30%] h-auto rounded-lg object-cover shadow"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm mt-4 flex items-center justify-center w-full h-screen">
            신혼집을 채울 혼수를 골라보세요
          </p>
        )}
      </button>
    </div>
  );
};

export default MyWishSmallCard;
