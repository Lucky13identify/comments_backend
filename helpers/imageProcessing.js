const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const uploadCloudinary = require("../helpers/uploadCloudinary");
const HttpError = require("../helpers");

const imageProcessing = async (file) => {
  try {
    const allowedFormats = ["jpg", "jpeg", "png", "gif"];

    if (!allowedFormats.includes(file.mimetype.split("/")[1])) {
      throw new Error("Invalid image format.");
    }

    const image = sharp(file.path);
    const metadata = await image.metadata();

    const maxWidth = 320;
    const maxHeight = 240;

    let processedImagePath = file.path;

    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      const uniqueFileName = `${uuidv4()}-${file.originalname}`;
      processedImagePath = `./temp/${uniqueFileName}`;

      await image
        .resize({
          width: maxWidth,
          height: maxHeight,
          fit: "inside",
        })
        .toFile(processedImagePath);
    }

    const processedImageURL = await uploadCloudinary(processedImagePath);

    return processedImageURL;
  } catch (error) {
    console.error("error", error);

    throw HttpError(500, "Internal Server Error");
  }
};

module.exports = imageProcessing;
