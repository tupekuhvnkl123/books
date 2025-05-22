import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import S from "./Auth.module.scss";
import { useContext, useEffect } from "react";
import { AuthCtx } from "../../context/AuthCtx";
import { IoIosArrowBack } from "react-icons/io";
import { ROUTES } from "../../routes/routePaths";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, authLoading } = useContext(AuthCtx);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, [location, authLoading]);

  return (
    <div className={S.container}>
      <Link to={ROUTES.HOME} className={S.backArrow}>
        <IoIosArrowBack size={30} />
      </Link>
      <div className={S.logoContainer}>
        <img src="/logo.svg" />
        <h1>Books Store</h1>
      </div>
      <Outlet />
    </div>
  );
};

export default Auth;
