import S from "./Menu.module.scss";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthCtx } from "../../../context/AuthCtx";
import { IoIosLogOut } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { RiMenu3Fill } from "react-icons/ri";
import { menuItems } from "./menu-items";

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated, logout, user } = useContext(AuthCtx);
  const navigate = useNavigate();
  const location = useLocation();

  const userIsntAdmin = !isAuthenticated || user?.role !== "admin";

  const closeMenu = () => setShowMenu(false);
  const openMenu = () => setShowMenu(true);

  const handleAuthButton = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate("/auth/login");
    }
    setShowMenu(false);
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
          <div className={S.overlay} onClick={closeMenu}></div>

          {/* Sidebar */}
          <div className={S.sidebar}>
            {menuItems.map(({ id, link, Icon, title, requiresAdmin }) => {
              if (requiresAdmin && userIsntAdmin) return;
              return (
                <Link
                  key={id}
                  to={link}
                  className={S.menuItem}
                  onClick={closeMenu}
                >
                  <Icon />
                  <span>{title}</span>
                </Link>
              );
            })}
            <button className={S.menuItem} onClick={handleAuthButton}>
              {isAuthenticated ? <IoIosLogOut /> : <IoIosLogIn />}
              <span>{isAuthenticated ? "Log Out" : "Log In"}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
