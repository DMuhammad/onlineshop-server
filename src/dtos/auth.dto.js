const Joi = require("joi");

const signUpSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const updatePasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().min(8).valid(Joi.ref("password")).required(),
});

function validateSignUp(data) {
  const { error, value } = signUpSchema.validate(data, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    const err = new Error("Validation failed");
    err.details = messages;
    return err;
  }

  return value;
}

function validateSignIn(data) {
  const { error, value } = signInSchema.validate(data, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    const err = new Error("Validation failed");
    err.details = messages;
    return err;
  }

  return value;
}

function validateUpdatePassword(data) {
  const { error, value } = updatePasswordSchema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    const err = new Error("Validate failed");
    err.details = messages;
    return err;
  }

  return value;
}

module.exports = {
  validateSignIn,
  validateSignUp,
  validateUpdatePassword,
};
