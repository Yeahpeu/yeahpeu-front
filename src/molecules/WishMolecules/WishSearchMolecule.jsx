import { useSearchParams } from "react-router-dom";
import { useSearchQuery } from "../../api/searchAPI";
import MyWishCard from "../../components/Cards/MyWishCard";
import MyEmptyCard from "../../components/Cards/MyEmptyCard";
import MyConfirm from "../../components/Modals/MyConfirm";
import { useState } from "react";
import { useAddWish } from "../../api/wishAPI";

const WishSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page")) || 1;

  const { data: wishlist = [], isLoading } = useSearchQuery({
    keyword: query,
    page,
  });
  const { mutate: addWish } = useAddWish();

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePageChange = (newPage) => {
    setSearchParams({ query, page: newPage });
  };

  const handleWishClick = (item) => {
    setSelectedItem(item);
    setIsConfirmVisible(true);
  };

  const handleConfirmAdd = () => {
    if (!selectedItem) return;

    addWish(selectedItem, {
      onError: (error) =>
        alert(
          `추가 실패: ${error.response?.data?.message || "알 수 없는 오류"}`
        ),
    });

    setIsConfirmVisible(false);
  };

  return (
    <div className="mt-4">
      {isLoading ? (
        <p className="text-gray-500">검색 중...</p>
      ) : wishlist.length > 0 ? (
        wishlist.map((item) => (
          <MyWishCard
            key={item.productId}
            item={item}
            onWishClick={() => handleWishClick(item)}
            selected={false}
          />
        ))
      ) : (
        <MyEmptyCard value="검색 결과가 없습니다" />
      )}

      {wishlist.length > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className={`px-3 py-1 border rounded-md ${num === page ? "bg-blue-500 text-white" : ""}`}
              onClick={() => handlePageChange(num)}
            >
              {num}
            </button>
          ))}
        </div>
      )}

      {/* ✅ 위시 추가 모달 */}
      <MyConfirm
        message="위시리스트에 추가하시겠습니까?"
        onCancel={() => setIsConfirmVisible(false)}
        onConfirm={handleConfirmAdd}
        optionLeft="취소"
        optionRight="추가"
        visible={isConfirmVisible}
      />
    </div>
  );
};

export default WishSearch;
