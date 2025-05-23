import { Link } from "react-router-dom";
import S from "./Register.module.scss";
import RegisterForm from "./RegisterForm";
import { RegisterFormData } from "../../../api/Auth";
import { ROUTES } from "../../../routes/routePaths";
import useRegister from "../../../api/reactQueryHooks/useRegister";

const Register = () => {
  const { mutate, isPending } = useRegister();

  return (
    <section className={S.container}>
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
