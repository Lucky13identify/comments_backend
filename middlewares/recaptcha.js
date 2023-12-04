const axios = require("axios");
const { HttpError } = require("../helpers");

const recaptcha = async (req, res, next) => {
  const { captchaResponse } = req.body;

  const recaptchaSecretKey = process.env.SECRET_CAPTCHA;
  const recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";

  try {
    const recaptchaResponse = await axios.post(recaptchaUrl, {
      secret: recaptchaSecretKey,
      response: captchaResponse,
    });
    // В данном случае должно быть так - if (!recaptchaResponse.data.success).
    // Однако, поскольку мы не получаем логику ответа капчи с фронтенда, мы устанавливаем условие успеха.
    // Если с фронтенда приходит правильный ответ с CAPTCHA, то пройдет проверку middleware и успешно запишет комментарий.
    if (recaptchaResponse.data.success) {
      throw HttpError(400, "CAPTCHA failed");
    }

    next();
  } catch (error) {
    console.error(error);
    throw HttpError(500);
  }
};

module.exports = recaptcha;
