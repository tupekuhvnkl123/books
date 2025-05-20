import { AuthCtxProvider } from "../context/AuthCtx";

const ContextProvider = ({ children }: React.PropsWithChildren) => {
  return <AuthCtxProvider>{children}</AuthCtxProvider>;
};

export default ContextProvider;
