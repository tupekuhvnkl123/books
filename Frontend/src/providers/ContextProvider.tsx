import { AuthCtxProvider } from "../context/AuthCtx";
import { PopupCtxProvider } from "../context/PopupCtx";

const ContextProvider = ({ children }: React.PropsWithChildren) => (
  <AuthCtxProvider>
    <PopupCtxProvider>{children}</PopupCtxProvider>
  </AuthCtxProvider>
);

export default ContextProvider;
