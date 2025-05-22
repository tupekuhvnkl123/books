import S from "./NewBook.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthCtx } from "../../../context/AuthCtx";
import { useContext, useEffect } from "react";
import { UserRole } from "../../../types/Users.types";
import { PuffLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { createBook } from "../../../api/Admin";
import Form from "./Form/Form";
import useNewBookForm from "../../../hooks/useNewBookForm";
import Image from "./Image/Image";
import { ROUTES } from "../../../routes/routePaths";

const NewBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authLoading, user } = useContext(AuthCtx);
  const { bookData, checkValidation, errors, updateBookData } =
    useNewBookForm();

  const { isPending, mutate } = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      navigate(ROUTES.HOME);
    },
  });

  useEffect(() => {
    if (user?.role !== UserRole.ADMIN && !authLoading) {
      navigate(ROUTES.HOME);
    }
  }, [location, authLoading, user]);

  const createBookHandler = () => {
    const isValid = checkValidation();
    if (!isValid) return;

    mutate(bookData);
  };

  return (
    <div className={S.container}>
      <button className={S.createButton} onClick={createBookHandler}>
        {isPending ? <PuffLoader color="#fff" size={20} /> : "Create"}
      </button>
      <Image
        err={errors.img}
        changeImage={(img?: string) => updateBookData("img", img)}
        currentImage={bookData.img}
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
