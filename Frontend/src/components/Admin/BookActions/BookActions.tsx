import { useNavigate } from "react-router-dom";
import S from "./BookActions.module.scss";
import { ROUTES } from "../../../routes/routePaths";
import { useMutation } from "@tanstack/react-query";
import { deleteBook } from "../../../api/Admin";
import Popup from "../../UI/Popup/Popup";
import { PuffLoader } from "react-spinners";

type BookActionsProps = {
  bookId: string;
  refetch?: () => void;
};

const BookActions = ({ bookId, refetch }: BookActionsProps) => {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => deleteBook(bookId),
    onSuccess: () => {
      if (refetch) {
        refetch();
      }
    },
  });

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const editRoute = `${ROUTES.ADMIN.NEW_BOOK}?editId=${bookId}`;
    navigate(editRoute);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    mutate();
  };

  return (
    <div className={S.container}>
      {isError && <Popup error={error} />}
      <button className={S.editBtn} onClick={handleEditClick}>
        Edit
      </button>
      <button className={S.deleteBtn} onClick={handleDeleteClick}>
        {isPending ? <PuffLoader color="#fff" size={20} /> : "Delete"}
      </button>
    </div>
  );
};

export default BookActions;
