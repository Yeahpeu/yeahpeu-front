import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MySearchBox from "../components/common/MySearchBar";
import WishInfoMolecule from "../molecules/WishMolecules/WishInfoMolecule";
import MyWishSmallCard from "../components/Cards/MyWishSmallCard";
import { useWishes } from "../api/wishAPI";

const PrepareMainPage = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/shop/search?query=${encodeURIComponent(query)}&page=1`);
  };

  const { data, isLoading, isError } = useWishes(3);

  const imageUrls = data?.wishItemEntities?.map((item) => item.imageUrl) || [];
  const total = data?.total || 0;

  return (
    <div className="p-8">
      <h2 className="text-xl text-center font-bold mb-4 text-red-200">
        혼수 검색하기
      </h2>
      <MySearchBox value={query} setValue={setQuery} onSearch={handleSearch} />
      <WishInfoMolecule
        onItemClick={(item) =>
          navigate(`/shop/search?query=${encodeURIComponent(item)}&page=1`)
        }
      />
      <MyWishSmallCard images={imageUrls} total={total} />
    </div>
  );
};

export default PrepareMainPage;
