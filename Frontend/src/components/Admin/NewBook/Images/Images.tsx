import { useContext, useRef } from "react";
import S from "./Images.module.scss";
import { NewProductCtx } from "../../../context/NewProductCtx";
import { ReactSVG } from "react-svg";
import ErrorMsg from "../Inputs/ErrorMsg";

const Images = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateProductData, productData, errors } = useContext(NewProductCtx);

  const currentImagesLength = productData.images?.length || 0;

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files) {
      return;
    }

    if (files.length > 5 || files.length + currentImagesLength > 5) {
      alert("ניתן לבחור עד 5 תמונות בלבד");
      return;
    }

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    const invalidFile = Array.from(files).find(
      (file) => !validTypes.includes(file.type)
    );
    if (invalidFile) {
      alert("אחד או יותר מהקבצים אינם מסוג נתמך");
      return;
    }

    try {
      const readFileAsBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

      const base64Images = await Promise.all(
        Array.from(files).map((file) => readFileAsBase64(file))
      );

      // Send array of base64 images to parent/state

      const currentImages = productData.images || [];
      const combinedImages = [...currentImages, ...base64Images];

      updateProductData("images", combinedImages);
      // if (fileInputRef.current) {
      //   fileInputRef.current.value = "";
      // }
    } catch (error) {
      console.error("שגיאה בהעלאת התמונות:", error);
      alert("אירעה שגיאה בעת עיבוד התמונות. נסה שוב.");
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (!productData.images) return;
    const updatedImages = [...productData.images].filter(
      (_, index) => index !== indexToRemove
    );

    updateProductData("images", updatedImages);
  };

  return (
    <div className={S.container}>
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <div className={`${S.images} ${!currentImagesLength ? S.empty : ""}`}>
        {productData.images &&
          !!currentImagesLength &&
          productData.images.map((img, index) => (
            <div className={S.imgContainer} key={index}>
              <ReactSVG
                src="icons/NewProduct/remove-image.svg"
                className={S.removeBtn}
                onClick={() => handleRemoveImage(index)}
              />
              <img key={index} src={img} alt={`Selected ${index + 1}`} />
            </div>
          ))}
        {currentImagesLength < 5 && (
          <button className={S.addButton} onClick={handleClick}>
            <ReactSVG src="icons/NewProduct/image.svg" />
            <span>הוסף תמונה</span>
          </button>
        )}
      </div>
      <div className={S.error_counter}>
        <p className={S.counter}>
          תמונות : {productData.images?.length || 0}/5
        </p>
        <ErrorMsg err={errors.images} className={S.errorMsg} />
      </div>
    </div>
  );
};

export default Images;
