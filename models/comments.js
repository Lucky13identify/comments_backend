const Joi = require("joi");
const HttpError = require("../helpers");

const schema = Joi.object({
  user: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  homePage: Joi.string().uri(),
  text: Joi.string().required(),
  imageURL: Joi.string().allow(null),
  fileTXT: Joi.string().allow(null),
});

const validateAsync = async (data) => {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    console.error("error", error);

    throw new HttpError(400, error.message);
  }
};

module.exports = {
  schema,
  validateAsync,
};
