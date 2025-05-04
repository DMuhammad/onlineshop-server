const Joi = require("joi");

const addDetailOrderSchema = Joi.object({
  orderId: Joi.string().guid({ version: "uuidv7" }).required(),
  productVariantId: Joi.string().guid({ version: "uuidv7" }).required(),
  quantity: Joi.number().integer().required(),
  subtotal: Joi.number().required(),
});

function validateAddDetailOrder(data) {
  const { error, value } = addDetailOrderSchema.validate(data, {
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
  validateAddDetailOrder,
};
