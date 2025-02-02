import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MySearchBox from "../components/common/MySearchBar";
import WishInfoMolecule from "../molecules/WishInfoMolecule";
import MyWishSmallCard from "../components/Cards/MyWishSmallCard";

const PrepareMainPage = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/shop?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="p-8">
      <MySearchBox value={query} setValue={setQuery} onSearch={handleSearch} />
      <WishInfoMolecule />
      <MyWishSmallCard images={[]} />
    </div>
  );
};

export default PrepareMainPage;
