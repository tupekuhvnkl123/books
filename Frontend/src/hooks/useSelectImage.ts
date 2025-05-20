import { useRef, useState } from "react";

const useSelectImage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<null | string>(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      alert("אנא בחר קובץ");
      return;
    }

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("סוג הקובץ לא נתמך");
      return;
    }

    // Validate only one file
    if (event.target.files?.length !== 1) {
      alert("אנא בחר רק תמונה אחת");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setImage(base64Image);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error processing the image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  return { fileInputRef, image, triggerFileInput, handleImageUpload };
};

export default useSelectImage;
