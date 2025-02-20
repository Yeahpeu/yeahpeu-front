import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MySearchBox from "../../components/common/MySearchBar";
import { useWishStore } from "../../stores/wishStore";

const WishSearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQuery = searchParams.get("query") || "";
  const [searchValue, setSearchValue] = useState(initialQuery);

  const setCategory = useWishStore((state) => state.setCategory);
  const selectedCategory = useWishStore((state) => state.selectedCategory);

  useEffect(() => {
    console.log("현재 선택된 카테고리:", selectedCategory);

    setSearchValue(initialQuery);
  }, [initialQuery]);

  const isSearchMode = !!initialQuery;

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    navigate(`/shop/search?query=${encodeURIComponent(searchValue)}&page=1`);
  };

  const handleBack = () => {
    setCategory(null);
    setSearchParams({});
    navigate("/shop/main");
  };

  const handleSearchItem = (item) => {
    console.log(item);
    navigate(`/shop/search?query=${encodeURIComponent(item)}&page=1`);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center w-full my-2">
        {isSearchMode && (
          <button onClick={handleBack} className="text-gray-600 mr-3">
            &lt;
          </button>
        )}
        <MySearchBox
          value={searchValue}
          setValue={setSearchValue}
          onSearch={handleSearch}
        />
      </div>

      {selectedCategory && selectedCategory.items.length > 0 && (
        <div className="overflow-x-auto whitespace-nowrap flex gap-2 p-2">
          {selectedCategory.items.map((item, index) => (
            <button
              key={index}
              className="px-4 py-2 border shadow-sm rounded-full text-gray-700 bg-red-50 hover:bg-gray-100 text-xs"
              onClick={() => handleSearchItem(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishSearchBox;
