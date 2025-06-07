const Joi = require("joi");

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

const signUpSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(passwordRegex).required().messages({
    "string.pattern.base":
      "Password must contain at least 1 capital letter, 1 number, and 1 symbol.",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(passwordRegex).required().messages({
    "string.pattern.base":
      "Password must contain at least 1 capital letter, 1 number, and 1 symbol",
  }),
});

const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).pattern(passwordRegex).required().messages({
    "string.pattern.base":
      "Password must contain at least 1 capital letter, 1 number, and 1 symbol",
  }),
  confirmPassword: Joi.string().min(8).valid(Joi.ref("newPassword")).required(),
});

function validateSignUp(data) {
  const { error, value } = signUpSchema.validate(data, { abortEarly: false });

  if (error) {
    const err = {
      status: "failed",
      error: {
        details: error.details.map(({ message, type, context }) => ({
          message: message.replace(/['"]/g, ""),
          type,
          label: context.key,
        })),
      },
    };

    return err;
  }

  return value;
}

function validateSignIn(data) {
  const { error, value } = signInSchema.validate(data, { abortEarly: false });

  if (error) {
    const err = {
      status: "failed",
      error: {
        details: error.details.map(({ message, type, context }) => ({
          message: message.replace(/['"]/g, ""),
          type,
          label: context.key,
        })),
      },
    };

    return err;
  }

  return value;
}

function validateUpdatePassword(data) {
  const { error, value } = updatePasswordSchema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    const err = {
      status: "failed",
      error: {
        details: error.details.map(({ message, type, context }) => ({
          message: message.replace(/['"]/g, ""),
          type,
          label: context.key,
        })),
      },
    };

    return err;
  }

  return value;
}

module.exports = {
  validateSignIn,
  validateSignUp,
  validateUpdatePassword,
};
