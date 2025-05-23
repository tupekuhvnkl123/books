import { ReactNode, useContext, useEffect } from "react";
import { UserRole } from "../../types/Users.types";
import { AuthCtx } from "../../context/AuthCtx";
import { useLocation, useNavigate } from "react-router-dom";

type PermissionGateProps = {
  children: ReactNode;
  roles?: UserRole[];
  redirectRoute?: string;
};

const PermissionGate = ({
  children,
  roles = [],
  redirectRoute,
}: PermissionGateProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthCtx);

  const permissionGuaranteed =
    !roles.length || (user && roles.includes(user.role));

  useEffect(() => {
    if (redirectRoute && !permissionGuaranteed) {
      navigate(redirectRoute);
    }
  }, [location]);

  if (!permissionGuaranteed) {
    return null;
  }

  return children;
};

export default PermissionGate;
