const Joi = require("joi");

const addReviewSchema = Joi.object({
  userId: Joi.string().guid({ version: "uuidv7" }).required(),
  orderId: Joi.string().guid({ version: "uuidv7" }).required(),
  rating: Joi.number().integer().required(),
  comment: Joi.string(),
});

function validateAddReview(data) {
  const { error, value } = addReviewSchema.validate(data, {
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
  validateAddReview,
};
