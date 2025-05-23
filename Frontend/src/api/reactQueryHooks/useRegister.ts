import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../Auth";
import { ROUTES } from "../../routes/routePaths";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getApiErr } from "../../utils/api-error";

const useRegister = () => {
  const navigate = useNavigate();

  const res = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => navigate(ROUTES.AUTH.LOGIN),
    onError: (err) => {
      toast.error(getApiErr(err));
    },
  });

  return res;
};

export default useRegister;
