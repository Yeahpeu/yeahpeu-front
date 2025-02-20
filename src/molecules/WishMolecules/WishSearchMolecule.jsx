import { useSearchParams, useNavigate } from "react-router-dom";
import { useSearchQuery } from "../../api/searchAPI";
import { useState, useEffect } from "react";
import MyWishCard from "../../components/Cards/MyWishCard";
import MyEmptyCard from "../../components/Cards/MyEmptyCard";
import MyConfirm from "../../components/Modals/MyConfirm";
import { useAddWish } from "../../api/wishAPI";
import MyLoading from "../../components/common/MyLoading";

const WishSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    setSearchParams({ query, page: "1" });
  }, [query, setSearchParams]);

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const { data: wishlist = [], isLoading } = useSearchQuery({
    keyword: query,
    page: 1,
    limit: 100,
  });

  const pageSize = 20;
  const totalPages = Math.ceil(wishlist.length / pageSize);
  const currentData = wishlist.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const { mutate: addWish } = useAddWish();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isNavConfirmVisible, setIsNavConfirmVisible] = useState(false);
  const [navConfirmMessage, setNavConfirmMessage] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleWishClick = (item) => {
    setSelectedItem(item);
    setIsConfirmVisible(true);
  };

  const handleConfirmAdd = () => {
    if (!selectedItem) return;

    addWish(selectedItem, {
      onSuccess: () => {
        setNavConfirmMessage(
          "추가되었습니다.\n마이 위시 리스트로 이동하시겠습니까?"
        );
        setIsNavConfirmVisible(true);
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
        if (
          errorMessage.includes("이미 존재") ||
          errorMessage.includes("이미 위시리스트에 존재")
        ) {
          setNavConfirmMessage(
            `이미 존재합니다. 
            마이 위시 리스트로 이동하시겠습니까?`
          );
          setIsNavConfirmVisible(true);
        } else {
          console.error(errorMessage);
        }
      },
    });

    setIsConfirmVisible(false);
  };

  const handleNavConfirm = () => {
    navigate("/shop/mywish");
  };

  const handleNavCancel = () => {
    setIsNavConfirmVisible(false);
  };

  return (
    <div className="mt-4 overflow-y-hidden max-h-full min-h-full">
      {isLoading ? (
        <MyLoading />
      ) : currentData.length > 0 ? (
        <div className="flex flex-col gap-y-4">
          {currentData.map((item, index) => (
            <MyWishCard
              key={index}
              item={item}
              onWishClick={() => handleWishClick(item)}
              selected={false}
            />
          ))}
        </div>
      ) : (
        <MyEmptyCard value="검색 결과가 없습니다" />
      )}

      {wishlist.length > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`px-3 py-1 border rounded-md ${
                num === currentPage ? "bg-red-300 text-white" : ""
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
        onCancel={() => setIsConfirmVisible(false)}
        onConfirm={handleConfirmAdd}
        optionLeft="취소"
        optionRight="추가"
        visible={isConfirmVisible}
      />

      {isNavConfirmVisible && (
        <MyConfirm
          message={navConfirmMessage}
          onCancel={handleNavCancel}
          onConfirm={handleNavConfirm}
          optionLeft="취소"
          optionRight="이동"
          visible={isNavConfirmVisible}
        />
      )}
    </div>
  );
};

export default WishSearch;
