import { Link } from "react-router-dom";
import S from "./Login.module.scss";
import LoginForm from "./LoginForm";
import { AuthCtx } from "../../../context/AuthCtx";
import { useContext } from "react";
import { LoginFormData } from "../../../api/Auth";
import { ROUTES } from "../../../routes/routePaths";
import useLogin from "../../../api/reactQueryHooks/useLogin";

const Login = () => {
  const { login } = useContext(AuthCtx);

  const { mutate, isPending } = useLogin({
    callback: (accessToken) => login({ accessToken }),
  });

  return (
    <section className={S.container}>
      <LoginForm
        login={(data: LoginFormData) => mutate(data)}
        isPending={isPending}
      />
      <p className={S.registerText}>
        New Account?
        <Link to={ROUTES.AUTH.REGISTER}>Register Here</Link>
      </p>
    </section>
  );
};

export default Login;
