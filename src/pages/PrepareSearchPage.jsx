import { useSearchParams, useNavigate } from "react-router-dom";
import { useSearchQuery } from "../api/searchAPI";
import { useAddWish } from "../api/wishAPI";
import MySearchBox from "../components/common/MySearchBar";
import MyWishCard from "../components/Cards/MyWishCard";
import MyConfirm from "../components/Modals/MyConfirm";
import MyEmptyCard from "../components/Cards/MyEmptyCard";
import { useState } from "react";

const PrepareSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page")) || 1;

  const { data: wishlist = [], isLoading } = useSearchQuery({
    keyword: query,
    page,
  });

  const { mutate: addWish } = useAddWish();

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchValue, setSearchValue] = useState(query);

  const handleSearch = (newQuery) => {
    if (newQuery.trim()) {
      setSearchParams({ query: newQuery, page: 1 });
    }
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ query, page: newPage });
  };

  const handleBack = () => {
    navigate(-1);
    setSearchValue("");
    setSearchParams({});
  };

  const handleWishClick = (item) => {
    setSelectedItem(item);
    setIsConfirmVisible(true);
  };

  const handleConfirmAdd = () => {
    if (!selectedItem) return;

    addWish(selectedItem, {
      onSuccess: () => {
        alert("위시리스트에 추가되었습니다!");
      },
      onError: (error) => {
        alert(
          `추가 실패: ${error.response?.data?.message || "알 수 없는 오류"}`
        );
      },
    });

    setIsConfirmVisible(false);
  };

  const handleCancel = () => {
    setIsConfirmVisible(false);
  };

  return (
    <div className="p-8">
      <h2 className="text-xl text-center font-bold mb-4 text-red-200">
        혼수 검색하기
      </h2>
      <div className="flex items-center space-x-2 align-middle">
        <button onClick={handleBack} className="text-gray-600 mr-3">
          &lt;
        </button>
        <MySearchBox
          value={searchValue}
          setValue={setSearchValue}
          onSearch={() => handleSearch(searchValue)}
        />
      </div>

      {isLoading ? (
        <p className="text-gray-500 mt-4">검색 중...</p>
      ) : (
        <div className="mt-4 space-y-4">
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <MyWishCard
                key={item.productId}
                item={item}
                onWishClick={() => handleWishClick(item)}
                selected={false}
              />
            ))
          ) : (
            <p className="text-gray-500 max-h-screen">
              <MyEmptyCard value={"검색 결과가 없습니다"} />
            </p>
          )}
        </div>
      )}

      {wishlist.length > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className={`px-3 py-1 border rounded-md ${
                num === page ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handlePageChange(num)}
            >
              {num}
            </button>
          ))}
        </div>
      )}
      <MyConfirm
        message="위시리스트에 추가하시겠습니까?"
        onCancel={handleCancel}
        onConfirm={handleConfirmAdd}
        optionLeft="취소"
        optionRight="추가"
        visible={isConfirmVisible}
      />
    </div>
  );
};

export default PrepareSearchPage;
