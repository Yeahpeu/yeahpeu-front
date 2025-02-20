import { useEffect } from "react";
import theme1Img from "../../assets/wishicon/theme1.png";
import theme2Img from "../../assets/wishicon/theme2.png";
import theme3Img from "../../assets/wishicon/theme3.png";
import theme4Img from "../../assets/wishicon/theme4.png";
import theme5Img from "../../assets/wishicon/theme5.png";
import theme6Img from "../../assets/wishicon/theme6.png";
import { categories } from "../../data/categories";
import { useWishStore } from "../../stores/wishStore";

const imageMap = {
  theme1: theme1Img,
  theme2: theme2Img,
  theme3: theme3Img,
  theme4: theme4Img,
  theme5: theme5Img,
  theme6: theme6Img,
};

const WishIconMolecule = () => {
  const { setCategory } = useWishStore();

  useEffect(() => {
    setCategory(null);
  }, [setCategory]);

  const handleClick = (category) => {
    setCategory(category);
  };

  return (
    <div className="grid grid-cols-3 gap-5 px-2">
      {categories.map((category, index) => (
        <div key={index} className="flex flex-col items-center">
          <button
            className="rounded-lg overflow-hidden w-full aspect-square bg-white shadow-lg"
            onClick={() => handleClick(category)}
          >
            <img
              src={imageMap[category.img]}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </button>
          <p className="mt-2 text-sm font-semibold text-gray-500">
            {category.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WishIconMolecule;
