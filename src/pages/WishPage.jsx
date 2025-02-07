import { Outlet } from "react-router-dom";
import SearchBoxMolecule from "../molecules/WishMolecules/WishSearchBox";

const WishPage = () => {
  return (
    <div className="p-8">
      <h2 className="text-xl text-center font-bold mb-4 text-red-200">
        혼수 검색하기
      </h2>

      <SearchBoxMolecule />
      <Outlet />
    </div>
  );
};

export default WishPage;
