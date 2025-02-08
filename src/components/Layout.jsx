import NavMolecule from "../molecules/NavMolecule";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <main className="flex-1 pb-[60px] overflow-auto">
        <Outlet />
      </main>
      <NavMolecule />
    </div>
  );
};

export default Layout;
