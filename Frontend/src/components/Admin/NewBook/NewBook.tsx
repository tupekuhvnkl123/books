import S from "./NewBook.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthCtx } from "../../../context/AuthCtx";

const NewBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, authLoading } = useContext(AuthCtx);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      navigate("/auth/login");
    }
  }, [location, authLoading]);

  return (
    <div className={S.container}>
      {/* {(isError || newProductReq.isError) && (
        <Popup msg={getApiErr(error || newProductReq.error)} />
      )}
      <Header profileImage={profileImage} name={name} isLoading={isLoading} />
      <Images />
      <Inputs phoneNumber={phoneNumber} city={city} /> */}
    </div>
  );
};

export default NewBook;
