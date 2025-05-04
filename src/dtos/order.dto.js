const Joi = require("joi");

const placeOrderSchema = Joi.object({
  userId: Joi.string().guid({ version: "uuidv7" }).required(),
  discountId: Joi.string().guid({ version: "uuidv7" }),
  totalPrice: Joi.number().required(),
  note: Joi.string().max(255),
});

const updateOrderStatusSchema = Joi.object({
  status: Joi.string().required(),
});

function validatePlaceOrder(data) {
  const { error, value } = placeOrderSchema.validate(data, {
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

function validateUpdateOrderStatus(data) {
  const { error, value } = updateOrderStatusSchema.validate(data, {
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
  validatePlaceOrder,
  validateUpdateOrderStatus,
};
