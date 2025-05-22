import { Link, useNavigate } from "react-router-dom";
import S from "./Register.module.scss";
import RegisterForm from "./RegisterForm";
import { RegisterFormData, registerRequest } from "../../../api/Auth";
import { useMutation } from "@tanstack/react-query";
import { getApiErr } from "../../../utils/api-error";
import Popup from "../../UI/Popup/Popup";
import { ROUTES } from "../../../routes/routePaths";

const Register = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => navigate(ROUTES.AUTH.LOGIN),
  });

  return (
    <section className={S.container}>
      {isError && <Popup msg={getApiErr(error)} />}

      <RegisterForm
        register={(data: RegisterFormData) => mutate(data)}
        isPending={isPending}
      />
      <p className={S.loginText}>
        Already have an account?
        <Link to={ROUTES.AUTH.LOGIN}>Login Here</Link>
      </p>
    </section>
  );
};

export default Register;
