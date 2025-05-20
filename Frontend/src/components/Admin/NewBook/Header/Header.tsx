import { useContext } from "react";
import { NewProductCtx } from "../../../context/NewProductCtx";
import S from "./Header.module.scss";
import { PuffLoader } from "react-spinners";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AuthCtx } from "../../../../context/AuthCtx";

type HeaderProps = {
  name?: string;
  profileImage?: string;
  isLoading: boolean;
};

const Header = ({ name, profileImage, isLoading }: HeaderProps) => {
  const { createProductHandler, newProductReq } = useContext(NewProductCtx);
  const { user } = useContext(AuthCtx);

  const renderImage = () =>
    isLoading ? (
      <Skeleton className={S.imageSkeleton} />
    ) : (
      <img src={profileImage || user?.profileImage} alt="profile-image" />
    );

  const renderName = () => (
    <span>
      {isLoading ? (
        <Skeleton className={S.titleSkeleton} />
      ) : (
        name || user?.name
      )}
    </span>
  );

  return (
    <div className={S.container}>
      <div className={S.buttonContainer}>
        <button onClick={createProductHandler}>
          {newProductReq.isPending ? (
            <PuffLoader color="#fff" size={20} />
          ) : (
            "פרסם"
          )}
        </button>
        {/* blue Loader */}
      </div>
      <div className={S.profile}>
        {renderImage()}
        {renderName()}
      </div>
    </div>
  );
};

export default Header;
