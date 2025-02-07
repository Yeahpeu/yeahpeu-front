import { useDeleteWish, useWishes } from "../api/wishAPI";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import MyWishCard from "../components/Cards/MyWishCard";
import MyEmptyCard from "../components/Cards/MyEmptyCard";
import MyConfirm from "../components/Modals/MyConfirm";
import { useState } from "react";

const MyWishPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useWishes();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: deleteEvent } = useDeleteWish();

  const wishItems = data?.wishItemEntities || [];
  const total = data?.total || 0;

  const handleBack = () => {
    navigate(-1);
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
    <div className="p-8">
      <div className="relative flex items-center justify-center py-4 border-b">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 mr-4 absolute left-2"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold text-red-200">내 위시 리스트</h2>
      </div>

      {isLoading ? (
        <p className="text-gray-500 mt-4">로딩 중...</p>
      ) : (
        <div className="mt-4 space-y-4">
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
