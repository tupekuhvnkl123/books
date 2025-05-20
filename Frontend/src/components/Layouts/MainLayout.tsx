import { Outlet, useLocation } from "react-router-dom";
import S from "./MainLayout.module.scss";
import TopLoader from "../UI/TopLoader/TopLoader";
import MobileMenu from "./Menu/MobileMenu/MobileMenu";
import useMediaQuery from "../../hooks/useMediaQuery";
import DesktopMenu from "./Menu/DesktopMenu/DesktopMenu";

const MainLayout = () => {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const authPage = pathname.startsWith("/auth");

  return (
    <main className={S.container}>
      <TopLoader />
      {!authPage && (isMobile ? <MobileMenu /> : <DesktopMenu />)}
      {/* Outlet returns all the routes */}
      <Outlet />
    </main>
  );
};

export default MainLayout;
