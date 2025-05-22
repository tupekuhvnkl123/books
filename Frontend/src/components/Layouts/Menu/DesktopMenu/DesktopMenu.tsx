import { Link, useNavigate } from "react-router-dom";
import S from "./DesktopMenu.module.scss";
import { menuItems } from "../menu-items";
import PermissionGate from "../../../HOC/PermissionGate";
import MenuItem from "../MenuItem";
import { useContext } from "react";
import { AuthCtx } from "../../../../context/AuthCtx";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { ROUTES } from "../../../../routes/routePaths";

const DesktopMenu = () => {
  const { isAuthenticated, logout } = useContext(AuthCtx);
  const navigate = useNavigate();

  const handleAuthButton = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate(ROUTES.AUTH.LOGIN);
    }
  };

  return (
    <div className={S.container}>
      <Link to={ROUTES.HOME} key={"logo"} className={S.logo}>
        <img src="/logo.svg" />
      </Link>
      {menuItems.map((item) => (
        <PermissionGate key={item.id} roles={item.permissionRoles}>
          <MenuItem item={item} />
        </PermissionGate>
      ))}
      <button className={S.authBtn} onClick={handleAuthButton}>
        {isAuthenticated ? (
          <IoIosLogOut className={S.icon} />
        ) : (
          <IoIosLogIn className={S.icon} />
        )}
        <span>{isAuthenticated ? "Logout" : "Login"}</span>
      </button>
    </div>
  );
};

export default DesktopMenu;
