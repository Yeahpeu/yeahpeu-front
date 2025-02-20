import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import SearchBoxMolecule from "../molecules/WishMolecules/WishSearchBox";

const WishPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = (e) => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="px-8 py-4 w-full h-full overflow-auto ">
      <SearchBoxMolecule />
      <Outlet />
    </div>
  );
};

export default WishPage;
