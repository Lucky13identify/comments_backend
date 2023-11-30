// Require the cloudinary library
const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;
// Return "https" URLs by setting secure: true
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

    // if (filePath.endsWith(".txt")) {
    //   const publicId = result.public_id;

    //   const downloadUrl = cloudinary.url(publicId, {
    //     fetch_format: "raw",
    //     attachment: true,
    //     type: "txt",
    //   });

    //   return downloadUrl;
    // }

    return result.url;
  } catch (error) {
    console.error("error", error);
  }
};

module.exports = uploadCloudinary;
