import NavBar from "./NavBar/NavBar";
import { Outlet } from "react-router-dom";
import S from "./MainLayout.module.scss";
import TopLoader from "../UI/TopLoader/TopLoader";

const MainLayout = () => {
  return (
    <main className={S.container}>
      <TopLoader />
      {/* Outlet returns all the routes */}
      <Outlet />
      <NavBar />
    </main>
  );
};

export default MainLayout;
