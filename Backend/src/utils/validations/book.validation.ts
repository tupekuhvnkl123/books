import { body, ValidationChain } from "express-validator";

const base64ImageRegex = /^data:image\/(png|jpeg|jpg);base64,[a-zA-Z0-9+/=]+$/;

const MAX_IMG_SIZE = 5 * 1024 * 1024; // 5MB

const validateTitle = body("title")
  .isString()
  .isLength({ max: 25 })
  .withMessage("Title must be at most 25 characters long");

const validateDescription = body("description")
  .isString()
  .isLength({ max: 300 })
  .withMessage("Description must be at most 300 characters long");

const validatePrice = body("price")
  .isNumeric()
  .withMessage("Price must be a number");

const validateImg = body("img")
  .isString()
  .withMessage("Image must be a base64 string")
  .custom((base64: string) => {
    if (!base64ImageRegex.test(base64)) {
      throw new Error(
        "Invalid image format. Supported formats are PNG, JPEG, and JPG."
      );
    }

    const base64String = base64.split(",")[1];
    const buffer = Buffer.from(base64String, "base64");

    if (buffer.length > MAX_IMG_SIZE) {
      throw new Error("Image size exceeds the maximum limit of 5MB.");
    }

    return true;
  });

const validateAuthor = body("author")
  .isString()
  .withMessage("Author must be a string");

const validatePublisher = body("publisher")
  .isString()
  .withMessage("Publisher must be a string");

export const validateBook: ValidationChain[] = [
  validateTitle.exists({ checkFalsy: true }).withMessage("Title is required"),
  validateDescription
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  validatePrice.exists().withMessage("Price is required"),
  validateImg.exists({ checkFalsy: true }).withMessage("Image is required"),
  validateAuthor.exists({ checkFalsy: true }).withMessage("Author is required"),
  validatePublisher
    .exists({ checkFalsy: true })
    .withMessage("Publisher is required"),
];

export const validateBookUpdate: ValidationChain[] = [
  validateTitle.optional({ checkFalsy: true }),
  validateDescription.optional({ checkFalsy: true }),
  validatePrice.optional(),
  validateImg.optional(),
  validateAuthor.optional({ checkFalsy: true }),
  validatePublisher.optional({ checkFalsy: true }),
];
