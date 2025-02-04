import { useSearchParams, useNavigate } from "react-router-dom";
import { useSearchQuery } from "../api/searchAPI";
import MySearchBox from "../components/common/MySearchBar";
import MyWishCard from "../components/Cards/MyWishCard";

const PrepareSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page")) || 1;

  const { data: wishlist = [], isLoading } = useSearchQuery({
    keyword: query,
    page,
  });

  const handleSearch = (newQuery) => {
    if (newQuery.trim()) {
      setSearchParams({ query: newQuery, page: 1 });
    }
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ query, page: newPage });
  };

  return (
    <div className="p-8">
      <MySearchBox
        value={query}
        setValue={(e) => handleSearch(e.target.value)}
        onSearch={() => handleSearch(query)}
      />

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
          <button
            key={num}
            className={`px-3 py-1 border rounded-md ${num === page ? "bg-blue-500 text-white" : ""}`}
            onClick={() => handlePageChange(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PrepareSearchPage;
