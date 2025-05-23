import { GoHome } from "react-icons/go";
import { IoPricetagsOutline } from "react-icons/io5";
import { UserRole } from "../../../types/Users.types";
import { LuBookPlus } from "react-icons/lu";
import { ROUTES } from "../../../routes/routePaths";

export const MENU_ITEMS = [
  {
    id: "home",
    link: ROUTES.HOME,
    Icon: GoHome,
    title: "Home",
  },
  {
    id: "purchased",
    link: ROUTES.PURCHASED,
    Icon: IoPricetagsOutline,
    title: "Purchased",
  },
  {
    id: "new-book",
    link: ROUTES.ADMIN.NEW_BOOK,
    Icon: LuBookPlus,
    title: "New Book",
    requiresAdmin: true,
    permissionRoles: [UserRole.ADMIN],
  },
];
