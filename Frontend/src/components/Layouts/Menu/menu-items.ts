import { GoHome } from "react-icons/go";
import { IoPricetagsOutline } from "react-icons/io5";
import { BsShieldLock } from "react-icons/bs";
import { UserRole } from "../../../types/Users.types";

export const menuItems = [
  {
    id: "home",
    link: "/",
    Icon: GoHome,
    title: "Home",
  },
  {
    id: "purchased",
    link: "/purchased",
    Icon: IoPricetagsOutline,
    title: "Purchased",
  },
  {
    id: "admin",
    link: "/admin",
    Icon: BsShieldLock,
    title: "Admin",
    requiresAdmin: true,
    permissionRoles: [UserRole.ADMIN],
  },
];
