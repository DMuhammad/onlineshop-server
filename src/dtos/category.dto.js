const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string().required(),
});
const updateCategorySchema = Joi.object({
  name: Joi.string(),
});

function validateCreateCategory(data) {
  const { error, value } = createCategorySchema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    const err = new Error("Validation failed");
    err.details = messages;
    return err;
  }

  return value;
}

function validateUpdateCategory(data) {
  const { error, value } = updateCategorySchema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    const err = new Error("Validation failed");
    err.details = messages;
    return err;
  }

  return value;
}

module.exports = {
  validateCreateCategory,
  validateUpdateCategory,
};
