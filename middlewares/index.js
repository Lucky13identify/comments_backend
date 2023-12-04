const upload = require("./upload");
const validateFileSize = require("./validateFileSize");
const validateXHTML = require("./validateXHTML");
const recaptcha = require("./recaptcha");

module.exports = {
  upload,
  validateFileSize,
  validateXHTML,
  recaptcha,
};
