import S from "./MobileMenu.module.scss";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthCtx } from "../../../../context/AuthCtx";
import { IoIosLogOut } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { RiMenu3Fill } from "react-icons/ri";
import { menuItems } from "../menu-items";
import MenuItem from "../MenuItem";
import PermissionGate from "../../../HOC/PermissionGate";
import { ROUTES } from "../../../../routes/routePaths";

const MobileMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthCtx);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => setShowMenu(false);
  const openMenu = () => setShowMenu(true);

  const handleAuthButton = () => {
    if (isAuthenticated) {
      logout();
      setShowMenu(false);
    } else {
      navigate(ROUTES.AUTH.LOGIN);
    }
  };

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  return (
    <div className={S.container}>
      <button onClick={openMenu} className={S.iconButton}>
        <RiMenu3Fill size={23} />
      </button>

      {showMenu && (
        <>
          {/* Overlay */}
          <div className={S.overlay} onClick={closeMenu} />

          {/* Sidebar */}
          <div className={S.sidebar}>
            {menuItems.map((item) => (
              <PermissionGate key={item.id} roles={item.permissionRoles}>
                <MenuItem item={item} closeMenu={closeMenu} />
              </PermissionGate>
            ))}
            <button className={S.authBtn} onClick={handleAuthButton}>
              {isAuthenticated ? <IoIosLogOut /> : <IoIosLogIn />}
              <span>{isAuthenticated ? "Log Out" : "Log In"}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
