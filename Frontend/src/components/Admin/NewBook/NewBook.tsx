import S from "./NewBook.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthCtx } from "../../../context/AuthCtx";
import { useContext, useEffect } from "react";
import { UserRole } from "../../../types/Users.types";
import { PuffLoader } from "react-spinners";
import Form from "./Form/Form";
import useNewBook from "../../../hooks/useNewBook";
import Image from "./Image/Image";
import { ROUTES } from "../../../routes/routePaths";
import Popup from "../../UI/Popup/Popup";

const NewBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authLoading, user } = useContext(AuthCtx);

  const {
    bookData,
    errors,
    updateBookData,
    editPreviewImg,
    createBookHandler,
    isEditMode,
    isError,
    isPending,
    error,
    removeEditPreviewImg,
  } = useNewBook();

  useEffect(() => {
    if (user?.role !== UserRole.ADMIN && !authLoading) {
      navigate(ROUTES.HOME);
    }
  }, [location, authLoading, user]);

  return (
    <div className={S.container}>
      {isError && <Popup error={error!} />}
      <button
        className={S.createButton}
        onClick={createBookHandler}
        disabled={isPending}
      >
        {isPending ? (
          <PuffLoader color="#fff" size={20} />
        ) : isEditMode ? (
          "Update"
        ) : (
          "Create"
        )}
      </button>
      <Image
        err={errors.img}
        changeImage={(img?: string) => updateBookData("img", img)}
        currentImage={bookData.img || editPreviewImg}
        removeEditPreviewImg={removeEditPreviewImg}
      />
      <Form
        errors={errors}
        updateBookData={updateBookData}
        bookData={bookData}
      />
    </div>
  );
};

export default NewBook;
