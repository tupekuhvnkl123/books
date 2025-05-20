import { NewProductErrorsType } from "../../hooks/useNewProductCtx";
import { NewProductDataType } from "../../types/Books.types";

export const validateTitle = (title?: string): string => {
  if (!title || !title.trim().length) {
    return "שדה זה נדרש";
  }
  return "";
};

export const validatePrice = (price?: number): string => {
  if (!price || price === 0) return "שדה זה נדרש";

  return "";
};

export const validateCategory = (category?: string): string => {
  if (!category) return "אנא בחר קטגוריה";

  return "";
};

export const validateDescription = (description?: string): string => {
  if (!description || !description.trim().length) {
    return "שדה זה נדרש";
  }

  return "";
};

export const validateCity = (city?: string): string => {
  if (!city) {
    return "אנא בחר עיר";
  }

  return "";
};

export const validatePhoneNumber = (phoneNumber?: string): string => {
  const pattern = /^05[0-9]{8}$/;
  if (!phoneNumber || !pattern.test(phoneNumber)) {
    return "מספר טלפון חייב להיות בפורמט ישראלי תקני (לדוגמה: 0501234567)";
  }

  return "";
};

export const validateImages = (images?: string[]): string => {
  if (!images || !images.length) {
    return "בחר לפחות תמונה אחת";
  }
  return "";
};

export const newProductValidationErrors = (
  reportData: NewProductDataType
): NewProductErrorsType => {
  const { category, city, description, images, phoneNumber, price, title } =
    reportData;

  const newErrors = {
    title: validateTitle(title),
    price: validatePrice(price),
    phoneNumber: validatePhoneNumber(phoneNumber),
    images: validateImages(images),
    city: validateCity(city),
    description: validateDescription(description),
    category: validateCategory(category),
  };

  return newErrors;
};
