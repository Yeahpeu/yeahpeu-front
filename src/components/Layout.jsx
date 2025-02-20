import NavMolecule from "../molecules/NavMolecule";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative bg-gray-50">
      <main className="flex-1">
        <div className="pb-14">
          <Outlet />
        </div>
        <NavMolecule />
      </main>
    </div>
  );
};

export default Layout;
