import { HttpErrorCreator } from "../helpers/index.js";

const validateRequestBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpErrorCreator(400, error.message));
    }
    next();
  };
};

export default validateRequestBody;
