import { Link, useLocation } from "react-router-dom";
import { navbarItems } from "./navbar-items";
import S from "./NavBar.module.scss";
import { ReactSVG } from "react-svg";

const NavBar = () => {
  const location = useLocation();
  const authPage = location.pathname.startsWith("/auth");
  const bookPage = location.pathname.startsWith("/book/");

  const hide = authPage || bookPage;

  return (
    <nav className={`${S.container} ${hide && S.hide}`}>
      {navbarItems.map(({ Icon, id, link }) => {
        const isActive = location.pathname === link;

        return (
          <Link
            to={link}
            key={id}
            className={`${S.navItem} ${isActive && S.active}`}
          >
            <Icon color={isActive ? "#118DF0" : "#B7B7B7"} size={30} />
          </Link>
        );
      })}
      <Link to={"/"} key={"logo"} className={`${S.navItem} ${S.logo}`}>
        <ReactSVG src="icons/Layout/logo.svg" />
      </Link>
    </nav>
  );
};

export default NavBar;
