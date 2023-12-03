const cloudinary = require("cloudinary").v2;
const HttpError = require("../helpers");

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  secure: true,
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    return result.url;
  } catch (error) {
    console.error("error", error);

    throw HttpError(500, "Internal Server Error");
  }
};

module.exports = uploadCloudinary;
