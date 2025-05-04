const Joi = require("joi");

const proceedDeliverySchema = Joi.object({
  orderId: Joi.string().guid({ version: "uuidv7" }).required(),
  courier: Joi.string().required(),
  estimateDelivery: Joi.date().required(),
});

const updateStatusSchema = Joi.object({
  status: Joi.string().required(),
});

const updateTrackingNumberSchema = Joi.object({
  trackingNumber: Joi.string().required(),
});

function validateProceedDelivery(data) {
  const { error, value } = proceedDeliverySchema.validate(data, {
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

function validateUpdateStatus(data) {
  const { error, value } = updateStatusSchema.validate(data, {
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

function validateTrackingNumber(data) {
  const { error, value } = updateTrackingNumberSchema.validate(data, {
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
  validateProceedDelivery,
  validateUpdateStatus,
  validateTrackingNumber,
};
