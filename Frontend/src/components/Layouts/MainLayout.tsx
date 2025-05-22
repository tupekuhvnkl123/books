import { Outlet, useLocation } from "react-router-dom";
import S from "./MainLayout.module.scss";
import TopLoader from "../UI/TopLoader/TopLoader";
import MobileMenu from "./Menu/MobileMenu/MobileMenu";
import useMediaQuery from "../../hooks/useMediaQuery";
import DesktopMenu from "./Menu/DesktopMenu/DesktopMenu";
import { ROUTES } from "../../routes/routePaths";

const MainLayout = () => {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const authPage = pathname.startsWith(ROUTES.AUTH.ROOT);
  const bookPage = pathname.startsWith("/book");

  return (
    <main className={S.container}>
      <TopLoader />
      {!authPage && (isMobile ? !bookPage && <MobileMenu /> : <DesktopMenu />)}
      {/* Outlet returns all the routes */}
      <Outlet />
    </main>
  );
};

export default MainLayout;
