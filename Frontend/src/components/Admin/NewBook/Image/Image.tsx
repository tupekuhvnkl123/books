import { useRef } from "react";
import S from "./Image.module.scss";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiImage } from "react-icons/fi";

type ImageProps = {
  err?: string;
  changeImage: (img?: string) => void;
  currentImage?: string | null;
  removeEditPreviewImg: () => void;
};

const validTypes = ["image/png", "image/jpeg", "image/jpg"];

const Image = ({
  err,
  changeImage,
  currentImage,
  removeEditPreviewImg,
}: ImageProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return alert("Please select a file");
    if (!validTypes.includes(file.type)) return alert("Unsupported file type");

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        changeImage(base64Image);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleRemoveImage = () => {
    changeImage(undefined);
    removeEditPreviewImg();
  };

  return (
    <div className={S.container}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      <div className={S.contentContainer}>
        {currentImage ? (
          <div className={S.imgContainer}>
            <button className={S.removeBtn}>
              <FaRegTrashAlt onClick={handleRemoveImage} size={20} />
            </button>
            <img src={currentImage} alt="Selected" />
          </div>
        ) : (
          <button className={S.addButton} onClick={triggerFileInput}>
            <FiImage size={20} />
            <span>Select image</span>
          </button>
        )}
      </div>

      <div className={S.error_counter}>
        <p className={S.counter}>Images : {currentImage ? 1 : 0}/1</p>
        {err && <p className={S.error}>{err}</p>}
      </div>
    </div>
  );
};

export default Image;
