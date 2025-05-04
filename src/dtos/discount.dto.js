const Joi = require("joi");

const addDiscountSchema = Joi.object({
  code: Joi.string().min(10).max(10).required(),
  type: Joi.string().required(),
  value: Joi.number().required(),
  expiredDate: Joi.date().required(),
});

function validateAddDiscount(data) {
  const { error, value } = addDiscountSchema.validate(data, {
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
  validateAddDiscount,
};
