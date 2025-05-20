import { Outlet, useLocation } from "react-router-dom";
import S from "./MainLayout.module.scss";
import TopLoader from "../UI/TopLoader/TopLoader";
import Menu from "./Menu/Menu";

const MainLayout = () => {
  const { pathname } = useLocation();
  const authPage = pathname.startsWith("/auth");

  return (
    <main className={S.container}>
      <TopLoader />
      {!authPage && <Menu />}
      {/* Outlet returns all the routes */}
      <Outlet />
    </main>
  );
};

export default MainLayout;
