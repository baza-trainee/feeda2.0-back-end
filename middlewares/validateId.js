import { isValidObjectId } from "mongoose";

import { HttpErrorCreator } from "../helpers/index.js";

const validateId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    next(HttpErrorCreator(404, `${contactId} is not valid id`));
  }
  next();
};

export default validateId;
