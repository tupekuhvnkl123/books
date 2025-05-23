import MainLayout from "../components/Layouts/MainLayout";
import ContextProvider from "../providers/ContextProvider";
import ReactQueryProvider from "../providers/ReactQueryProvider";

const AppElement = () => (
  <ReactQueryProvider>
    <ContextProvider>
      <MainLayout />
    </ContextProvider>
  </ReactQueryProvider>
);

export default AppElement;
