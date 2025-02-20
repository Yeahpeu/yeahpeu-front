import { useState } from "react";
import { categories } from "../../data/categories";

const WishInfoMolecule = ({ onItemClick }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const itemCount = categories.length;
  return (
    <div className="flex w-full h-full border shadow-md rounded-md overflow-hidden">
      <ul
        className="grid w-1/4"
        style={{ gridTemplateRows: `repeat(${itemCount}, 1fr)` }}
      >
        {categories.map((category) => (
          <li
            key={category.name}
            className={`cursor-pointer p-4 text-width border-b flex items-center justify-center  ${
              selectedCategory.name === category.name
                ? "bg-red-50 font-bold text-gray-700"
                : "bg-gray-50 text-gray-500 "
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.name}
          </li>
        ))}
      </ul>

      <div className="w-3/4 px-4 py-2 overflow-y-auto h-full bg-red-50 text-left ">
        <ul>
          {selectedCategory.items.map((item, index) => (
            <li
              key={item}
              onClick={() => onItemClick(item)}
              className={`cursor-pointer text-gray-700 font-bold hover:underline p-1 py-3 ${
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
