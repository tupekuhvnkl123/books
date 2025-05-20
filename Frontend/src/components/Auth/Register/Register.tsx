import { Link, useNavigate } from "react-router-dom";
import S from "./Register.module.scss";
import RegisterForm from "./RegisterForm";
import { RegisterFormData, registerRequest } from "../../../api/Auth";
import { useMutation } from "@tanstack/react-query";
import { getApiErr } from "../../../utils/api-error";
import Popup from "../../UI/Popup/Popup";

const Register = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => navigate("/auth/login"),
  });

  return (
    <section className={S.container}>
      {isError && <Popup msg={getApiErr(error)} />}

      <div className={S.logoContainer}>
        <img src="/logo.svg" />
        <h1>MarketSphere</h1>
      </div>
      <RegisterForm
        register={(data: RegisterFormData) => mutate(data)}
        isPending={isPending}
      />
      <p className={S.loginText}>
        משתמש קיים?
        <Link to={"/auth/login"}>התחבר כאן</Link>
      </p>
    </section>
  );
};

export default Register;
