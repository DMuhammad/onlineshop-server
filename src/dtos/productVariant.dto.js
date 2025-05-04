const Joi = require("joi");

const createProductVariantSchema = Joi.object({
  productId: Joi.string()
    .guid({
      version: "uuidv7",
    })
    .required(),
  variantType: Joi.string().required(),
  variantValue: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().integer().required(),
  imageUrl: Joi.string(),
});
const updateProductVariantSchema = Joi.object({
  productId: Joi.string().guid({
    version: "uuidv7",
  }),
  variantType: Joi.string(),
  variantValue: Joi.string(),
  price: Joi.number(),
  stock: Joi.number().integer(),
  imageUrl: Joi.string(),
});

function validateCreateProduct(data) {
  const { error, value } = createProductVariantSchema.validate(data, {
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
function validateUpdateProduct(data) {
  const { error, value } = updateProductVariantSchema.validate(data, {
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
  validateCreateProduct,
  validateUpdateProduct,
};
