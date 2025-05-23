import S from "./NewBook.module.scss";
import { PuffLoader } from "react-spinners";
import Form from "./Form/Form";
import useNewBook from "./hooks/useNewBook";
import Image from "./Image/Image";

const NewBook = () => {
  const {
    bookData,
    errors,
    updateBookData,
    editPreviewImg,
    createBookHandler,
    isEditMode,
    isPending,
    removeEditPreviewImg,
  } = useNewBook();

  return (
    <div className={S.container}>
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
