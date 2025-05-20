import { ChangeEvent, FormEvent, useState } from "react";
import { RegisterFormData } from "../../../api/Auth";
import S from "./Register.module.scss";
import {
  validateName,
  validatePassword,
  validateUsername,
} from "../../../utils/validations/auth.validation";
import { ReactSVG } from "react-svg";
import { PuffLoader } from "react-spinners";

type FormErrors = {
  name?: string;
  username?: string;
  password?: string;
};

type RegisterFormProps = {
  register: (data: RegisterFormData) => void;
  isPending: boolean;
};

const RegisterForm = ({ register, isPending }: RegisterFormProps) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
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
      name: validateName(formData.name),
      username: validateUsername(formData.username),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((err) => !err)) {
      register(formData);
    }
  };

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit} className={S.form}>
      <div className={S.inputContainer}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      {errors.name && <span className={S.error}>{errors.name}</span>}
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
        <ReactSVG
          src="/icons/Auth/hide-password.svg"
          onClick={togglePasswordVisibility}
        />
      </div>
      {errors.password && <span className={S.error}>{errors.password}</span>}

      <button type="submit" disabled={isPending}>
        {isPending ? <PuffLoader color="#118DF0" size={25} /> : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
