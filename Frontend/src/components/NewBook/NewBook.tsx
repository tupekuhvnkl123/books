import { useContext, useEffect } from "react";
import Header from "./Header/Header";
import Images from "./Images/Images";
import Inputs from "./Inputs/Inputs";
import S from "./NewProduct.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthCtx } from "../../context/AuthCtx";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/Users";
import { NewProductCtx } from "../../context/NewProductCtx";
import Popup from "../UI/Popup/Popup";
import { getApiErr } from "../../utils/api-error";

const NewBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, authLoading } = useContext(AuthCtx);
  const { newProductReq } = useContext(NewProductCtx);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      navigate("/auth/login");
    }
  }, [location, authLoading]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: isAuthenticated,
  });

  const { profileImage, name, city, phoneNumber } = data || {};

  return (
    <div className={S.container}>
      {(isError || newProductReq.isError) && (
        <Popup msg={getApiErr(error || newProductReq.error)} />
      )}
      <Header profileImage={profileImage} name={name} isLoading={isLoading} />
      <Images />
      <Inputs phoneNumber={phoneNumber} city={city} />
    </div>
  );
};

export default NewBook;
