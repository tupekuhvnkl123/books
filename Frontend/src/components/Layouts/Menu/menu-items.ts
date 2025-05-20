import { GoHome } from "react-icons/go";
import { IoPricetagsOutline } from "react-icons/io5";
import { UserRole } from "../../../types/Users.types";
import { LuBookPlus } from "react-icons/lu";

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
    id: "new-book",
    link: "/new-book",
    Icon: LuBookPlus,
    title: "New Book",
    requiresAdmin: true,
    permissionRoles: [UserRole.ADMIN],
  },
];
