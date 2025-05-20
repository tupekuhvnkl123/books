import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import S from "./Auth.module.scss";
import { useContext, useEffect } from "react";
import { AuthCtx } from "../../context/AuthCtx";
import { IoIosArrowBack } from "react-icons/io";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, authLoading } = useContext(AuthCtx);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [location, authLoading]);

  return (
    <div className={S.container}>
      <Link to={"/"} className={S.backArrow}>
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
