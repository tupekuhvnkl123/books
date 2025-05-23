import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../Auth";

type Props = { callback: (accessToken: string) => void };

const useLogin = ({ callback }: Props) => {
  const res = useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ accessToken }) => {
      callback(accessToken);
    },
  });

  return res;
};

export default useLogin;
