const Joi = require("joi");

const createNewAdminSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  status: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  photoUrl: Joi.string(),
  phone: Joi.string().min(10).max(14),
  address: Joi.string().min(10),
});

function validateCreateNewAdmin(data) {
  const { error, value } = createNewAdminSchema.validate(data, {
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

function validateUpdateUser(data) {
  const { error, value } = updateUserSchema.validate(data, {
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
  validateCreateNewAdmin,
  validateUpdateUser,
};
