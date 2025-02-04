import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MySearchBox from "../components/common/MySearchBar";
import WishInfoMolecule from "../molecules/WishMolecules/WishInfoMolecule";
import MyWishSmallCard from "../components/Cards/MyWishSmallCard";

const PrepareMainPage = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/shop/search?query=${encodeURIComponent(query)}&page=1`);
  };

  return (
    <div className="p-8">
      <MySearchBox value={query} setValue={setQuery} onSearch={handleSearch} />
      <WishInfoMolecule
        onItemClick={(item) =>
          navigate(`/shop/search?query=${encodeURIComponent(item)}&page=1`)
        }
      />
      <MyWishSmallCard images={[]} />
    </div>
  );
};

export default PrepareMainPage;
