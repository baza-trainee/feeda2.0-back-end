import Joi from "joi";

const userSignupSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": "missing required field password",
    "string.min": `"password" should have a minimum length of 6`,
  }),
  email: Joi.string().required().messages({ "any.required": "missing required field email" }),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const userSinginSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": "missing required field password",
    "string.min": `"password" should have a minimum length of 6`,
  }),
  email: Joi.string().required().messages({ "any.required": "missing required field email" }),
});

const userUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({ "any.required": "missing required field subscription" }),
});

const userEmailSchema = Joi.object({
  email: Joi.string().required().messages({ "any.required": "missing required field email" }),
});

export default {
  userSignupSchema,
  userSinginSchema,
  userUpdateSubscription,
  userEmailSchema,
};
