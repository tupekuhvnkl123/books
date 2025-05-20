import { IconType } from "react-icons";
import { Link } from "react-router-dom";
import S from "./MenuItem.module.scss";

type MenuItemProps = {
  item: {
    id: string;
    link: string;
    Icon: IconType;
    title: string;
  };
  closeMenu?: () => void;
};

const MenuItem = ({ item, closeMenu }: MenuItemProps) => {
  const { id, link, Icon, title } = item;

  return (
    <Link key={id} to={link} className={S.container} onClick={closeMenu}>
      <Icon className={S.icon} />
      <span>{title}</span>
    </Link>
  );
};

export default MenuItem;
