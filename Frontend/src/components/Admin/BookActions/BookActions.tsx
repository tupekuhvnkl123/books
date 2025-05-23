import { useNavigate } from "react-router-dom";
import S from "./BookActions.module.scss";
import { getEditBookRoute } from "../../../routes/routePaths";
import { PuffLoader } from "react-spinners";
import useDeleteBook from "../../../api/reactQueryHooks/useDeleteBook";

type BookActionsProps = {
  bookId: string;
  refetch?: () => void;
};

const BookActions = ({ bookId, refetch }: BookActionsProps) => {
  const navigate = useNavigate();

  const { mutate, isPending } = useDeleteBook({
    bookId,
    callback: refetch,
  });

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(getEditBookRoute(bookId));
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    mutate();
  };

  return (
    <div className={S.container}>
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
