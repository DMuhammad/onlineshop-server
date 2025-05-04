const Joi = require("joi");

const proceedPaymentSchema = Joi.object({
  orderId: Joi.string().guid({ version: "uuidv7" }).required(),
  paymentMethod: Joi.string().required(),
  price: Joi.number().required(),
});

const updatePaymentStatusSchema = Joi.object({
  status: Joi.string().required(),
});

function validateProceedPayment(data) {
  const { error, value } = proceedPaymentSchema.validate(data, {
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

function validatePaymentStatus(data) {
  const { error, value } = updatePaymentStatusSchema.validate(data, {
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
  validateProceedPayment,
  validatePaymentStatus,
};
