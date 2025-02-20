import { useDeleteWish, useWishes } from "../api/wishAPI";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import MyWishCard from "../components/Cards/MyWishCard";
import MyEmptyCard from "../components/Cards/MyEmptyCard";
import MyConfirm from "../components/Modals/MyConfirm";
import { useState } from "react";
import MyLoading from "../components/common/MyLoading";
import { useWishStore } from "../stores/wishStore";

const MyWishPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, isLoading } = useWishes();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: deleteEvent } = useDeleteWish();
  const initialQuery = searchParams.get("query") || "";
  const [searchValue, setSearchValue] = useState(initialQuery);

  const setCategory = useWishStore((state) => state.setCategory);

  const wishItems = data?.wishItemEntities || [];
  const total = data?.total || 0;

  const handleBack = () => {
    setCategory(null);
    setSearchParams({});
    navigate("/shop/main");
  };

  const handleWishClick = (item) => {
    setSelectedItem(item);
    setIsConfirmVisible(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedItem) return;

    deleteEvent(selectedItem.id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["wishes"]);
      },
      onError: (error) => {
        console.error("삭제 오류:", error);
      },
    });

    setIsConfirmVisible(false);
  };

  const handleCancel = () => {
    setIsConfirmVisible(false);
  };

  return (
    <div>
      <div className="py-4 bg-white">
        <div className="relative flex items-center justify-center mb-2">
          <button
            onClick={handleBack}
            className="absolute left-4 text-gray-600"
          >
            &lt;
          </button>
          <h1 className="text-xl font-semibold">내 위시 리스트</h1>
          {/* 오른쪽에 빈 공간 추가 */}
          <div className="absolute right-4 w-6 h-6"></div>
        </div>
      </div>
      <hr className="mb-2 " />
      {isLoading ? (
        <div className="px-8 py-4">
          <MyLoading />
        </div>
      ) : (
        <div className="mt-4 space-y-4 px-8 py-4">
          {wishItems.length > 0 ? (
            wishItems.map((item) => (
              <MyWishCard
                key={item.id}
                item={item}
                onWishClick={() => handleWishClick(item)}
                selected={true}
              />
            ))
          ) : (
            <MyEmptyCard value="위시리스트가 비어있어요!" />
          )}
        </div>
      )}

      <MyConfirm
        message={"위시 아이템을 삭제하시겠습니까?"}
        onCancel={handleCancel}
        onConfirm={handleConfirmDelete}
        optionLeft="취소"
        optionRight="삭제"
        visible={isConfirmVisible}
      />
    </div>
  );
};

export default MyWishPage;
