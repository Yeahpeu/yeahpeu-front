import { useSearchParams } from "react-router-dom";
import { useSearchQuery } from "../api/searchAPI";
import MySearchBox from "../components/common/MySearchBar";
import MyWishCard from "../components/Cards/MyWishCard";

const PrepareSearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { data: wishlist = [], isLoading } = useSearchQuery(query);

  return (
    <div className="p-6">
      <MySearchBox value={query} setValue={() => {}} onSearch={() => {}} />

      <p className="text-gray-500 mt-2">총 검색 결과: {wishlist.length}건</p>

      {isLoading ? (
        <p className="text-gray-500 mt-4">검색 중...</p>
      ) : (
        <div className="mt-4 space-y-4">
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <MyWishCard
                key={item.productId}
                item={item}
                onShareClick={() => {}}
                onWishClick={() => {}}
              />
            ))
          ) : (
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          )}
        </div>
      )}

      <div className="flex justify-center mt-6 space-x-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <button key={num} className="px-3 py-1 border rounded-md">
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PrepareSearchPage;
