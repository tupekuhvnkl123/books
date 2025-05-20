import S from "./Inputs.module.scss";

const ErrorMsg = ({ err, className }: { err?: string; className?: string }) => {
  if (!err) return null;
  return <p className={`${S.errorMsg} ${className}`}>{err}</p>;
};

export default ErrorMsg;
