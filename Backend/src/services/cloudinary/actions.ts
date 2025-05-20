import cloudinary from "./cloudinary";

type SingleUploadParams = {
  image: string;
  path: string;
};

export const singleImageUpload = async ({
  image,
  path,
}: SingleUploadParams) => {
  if (!image) return;

  try {
    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: `Books/${path}`,
    });

    return uploadedImage.secure_url;
  } catch (err) {
    console.log(err);

    throw err;
  }
};
