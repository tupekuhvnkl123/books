import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../Auth";
import toast from "react-hot-toast";
import { getApiErr } from "../../utils/api-error";

type Props = { callback: (accessToken: string) => void };

const useLogin = ({ callback }: Props) => {
  const res = useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ accessToken }) => {
      callback(accessToken);
      toast.success("Logged in successfully");
    },
    onError: (err) => {
      toast.error(getApiErr(err));
    },
  });

  return res;
};

export default useLogin;
