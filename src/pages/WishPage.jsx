import { Outlet } from "react-router-dom";
import SearchBoxMolecule from "../molecules/WishMolecules/WishSearchBox";

const WishPage = () => {
  return (
    <div className="p-8 w-full h-full overflow-auto">
      <h2 className="text-xl text-center font-bold mb-4 text-gray-400">
        혼수 검색하기
      </h2>

      <SearchBoxMolecule />
      <Outlet />
    </div>
  );
};

export default WishPage;
