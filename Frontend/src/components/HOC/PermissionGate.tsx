import { ReactNode, useContext } from "react";
import { UserRole } from "../../types/Users.types";
import { AuthCtx } from "../../context/AuthCtx";

type PermissionGateProps = {
  children: ReactNode;
  roles?: UserRole[];
};

const PermissionGate = ({ children, roles = [] }: PermissionGateProps) => {
  const { isAuthenticated, user } = useContext(AuthCtx);

  const permissionRejected =
    !isAuthenticated || !user || !roles.includes(user.role);

  if (roles.length && permissionRejected) {
    return null;
  }

  return children;
};

export default PermissionGate;
