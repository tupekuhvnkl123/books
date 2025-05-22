import { NewBookDataType, NewBookErrorsType } from "../../types/Books.types";

export const validateTitle = (title?: string): string => {
  if (!title || !title.trim().length) {
    return "This field is required";
  }
  return "";
};

export const validateDescription = (description?: string): string => {
  if (!description || !description.trim().length) {
    return "This field is required";
  }

  return "";
};

export const validatePrice = (price?: number): string => {
  if (!price || price === 0) return "This field is required";

  return "";
};

export const validateAuthor = (author?: string): string => {
  if (!author || !author.trim().length) {
    return "This field is required";
  }

  return "";
};
export const validatePublisher = (publisher?: string): string => {
  if (!publisher || !publisher.trim().length) {
    return "This field is required";
  }

  return "";
};

export const validateImage = (image?: string): string => {
  if (!image) {
    return "Please select an image";
  }
  return "";
};

export const newBookValidationErrors = ({
  bookData,
  editMode,
}: {
  bookData: NewBookDataType;
  editMode?: "editMode";
}): NewBookErrorsType => {
  const { author, publisher, description, img, price, title } = bookData;

  const newErrors = {
    title: validateTitle(title),
    price: validatePrice(price),
    img: editMode ? "" : validateImage(img),
    description: validateDescription(description),
    author: validateAuthor(author),
    publisher: validatePublisher(publisher),
  };

  return newErrors;
};
