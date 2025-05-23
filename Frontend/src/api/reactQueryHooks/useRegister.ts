import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../Auth";
import { ROUTES } from "../../routes/routePaths";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const navigate = useNavigate();

  const res = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => navigate(ROUTES.AUTH.LOGIN),
  });

  return res;
};

export default useRegister;
