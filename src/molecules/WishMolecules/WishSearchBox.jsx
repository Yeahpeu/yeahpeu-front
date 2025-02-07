import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MySearchBox from "../../components/common/MySearchBar";

const SearchBoxMolecule = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQuery = searchParams.get("query") || "";
  const [searchValue, setSearchValue] = useState(initialQuery);

  useEffect(() => {
    setSearchValue(initialQuery);
  }, [initialQuery]);

  const isSearchMode = !!initialQuery;

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    setSearchParams({ query: searchValue, page: 1 });
  };

  const handleBack = () => {
    navigate("/shop/main");
  };

  return (
    <div className="flex items-center space-x-2 align-middle">
      {isSearchMode && (
        <button onClick={handleBack} className="text-gray-600 mr-3">
          &lt;
        </button>
      )}
      <MySearchBox
        value={searchValue}
        setValue={setSearchValue}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default SearchBoxMolecule;
