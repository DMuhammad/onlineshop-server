const Joi = require("joi");

const createProductSchema = Joi.object({
  categoryId: Joi.string()
    .guid({
      version: "uuidv7",
    })
    .required(),
  name: Joi.string().required(),
  description: Joi.string().min(10).required(),
});

function validateCreateProduct(data) {
  const { error, value } = createProductSchema.validate(data, {
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

module.exports = validateCreateProduct;
