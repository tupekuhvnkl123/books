import { Link } from "react-router-dom";
import S from "./Login.module.scss";
import LoginForm from "./LoginForm";
import { AuthCtx } from "../../../context/AuthCtx";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { LoginFormData, loginRequest } from "../../../api/Auth";
import { getApiErr } from "../../../utils/api-error";
import Popup from "../../UI/Popup/Popup";

const Login = () => {
  const { login } = useContext(AuthCtx);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ accessToken }) => {
      login({ accessToken });
    },
  });

  return (
    <section className={S.container}>
      {isError && <Popup msg={getApiErr(error)} />}
      <LoginForm
        login={(data: LoginFormData) => mutate(data)}
        isPending={isPending}
      />
      <p className={S.registerText}>
        New Account?
        <Link to={"/auth/register"}>Register Here</Link>
      </p>
    </section>
  );
};

export default Login;
