import { useState } from "react";
import { categories } from "../../data/categories"; // categories 가져오기

const WishInfoMolecule = ({ onItemClick }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // 기본 선택
  const itemCount = categories.length; // 카테고리 개수 계산

  return (
    <div className="flex w-full h-full border shadow-sm rounded-md overflow-hidden">
      <ul
        className="grid w-1/4"
        style={{ gridTemplateRows: `repeat(${itemCount}, 1fr)` }}
      >
        {categories.map((category) => (
          <li
            key={category.name}
            className={`cursor-pointer p-4 text-width border-b flex items-center justify-center  ${
              selectedCategory.name === category.name
                ? "bg-white font-bold text-black"
                : "bg-gray-200 text-gray-500"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.name}
          </li>
        ))}
      </ul>

      <div className="w-3/4 px-4 py-2 overflow-y-auto h-full bg-white text-left">
        <ul>
          {selectedCategory.items.map((item, index) => (
            <li
              key={item}
              onClick={() => onItemClick(item)}
              className={`cursor-pointer text-blue-500 hover:underline p-1 py-3 ${
                index === selectedCategory.items.length - 1 ? "" : "border-b"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WishInfoMolecule;
