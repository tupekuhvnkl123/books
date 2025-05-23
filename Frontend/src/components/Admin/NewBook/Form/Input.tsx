import S from "./Input.module.scss";

type InputProps = {
  err?: string;
  icon?: React.ElementType;
  isTextarea?: boolean;
  inputProps: React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};

const Input = ({ err, inputProps, icon: Icon, isTextarea }: InputProps) => {
  const { value = "", type = "text" } = inputProps;

  return (
    <>
      <div className={`${S.inputContainer} ${isTextarea && S.textarea}`}>
        {Icon && <Icon />}
        {isTextarea ? (
          <textarea {...inputProps} value={value} />
        ) : (
          <input {...inputProps} type={type} value={value} />
        )}
      </div>
      {err && <p className={S.errorMsg}>{err}</p>}
    </>
  );
};

export default Input;
