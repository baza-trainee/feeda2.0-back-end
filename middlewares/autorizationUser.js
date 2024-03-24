import jwt from "jsonwebtoken";
import { HttpErrorCreator } from "../helpers/index.js";
import { User } from "../models/index.js";
import { controllerDecorator } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

export const autorizationUser = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw HttpErrorCreator(401);
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpErrorCreator(401);
    }
    req.user = user;
    next();
  } catch {
    throw HttpErrorCreator(401);
  }
};

export default controllerDecorator(autorizationUser);
