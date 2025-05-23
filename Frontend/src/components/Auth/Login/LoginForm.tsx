import { ChangeEvent, FormEvent, useState } from "react";
import { LoginFormData } from "../../../api/Auth";
import S from "./Login.module.scss";
import { PuffLoader } from "react-spinners";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type FormErrors = {
  username?: string;
  password?: string;
};

type LoginFormProps = {
  login: (data: LoginFormData) => void;
  isPending: boolean;
};

const LoginForm = ({ login, isPending }: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const newErrors: FormErrors = {
      username: !formData.username.trim().length
        ? "This field is required"
        : "",
      password: !formData.password.trim().length
        ? "This field is required"
        : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((err) => !err)) {
      login(formData);
    }
  };

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <form className={S.form} onSubmit={handleSubmit}>
      <div className={S.inputContainer}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      {errors.username && <span className={S.error}>{errors.username}</span>}
      <div className={S.inputContainer}>
        <input
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {isPasswordVisible ? (
          <AiOutlineEyeInvisible onClick={togglePasswordVisibility} />
        ) : (
          <AiOutlineEye onClick={togglePasswordVisibility} />
        )}
      </div>
      {errors.password && <span className={S.error}>{errors.password}</span>}
      <button type="submit" disabled={isPending}>
        {isPending ? <PuffLoader color="#118DF0" size={25} /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
