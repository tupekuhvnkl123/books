import { GoHome } from "react-icons/go";
import { IoPricetagsOutline } from "react-icons/io5";
import { BsShieldLock } from "react-icons/bs";

export const menuItems = [
  {
    id: "home",
    link: "/",
    Icon: GoHome,
    title: "Home Page",
  },
  {
    id: "purchased",
    link: "/purchased",
    Icon: IoPricetagsOutline,
    title: "Purchased List",
  },
  {
    id: "admin",
    link: "/admin",
    Icon: BsShieldLock,
    title: "Admin",
    requiresAdmin: true,
  },
];
