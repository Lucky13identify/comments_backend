const Joi = require("joi");

const schema = Joi.object({
  user: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  homePage: Joi.string().uri(),
  text: Joi.string().required(),
});

const validateAsync = async (data) => {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  schema,
  validateAsync,
};
