import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../../models/index.js";
import HttpErrorCreator from "../../helpers/HttpErrorCreator.js";

const { JWT_SECRET } = process.env;

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpErrorCreator(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpErrorCreator(401, "Email or password is wrong");
  }
  const userPassword = await bcryptjs.compare(password, user.password);
  if (!userPassword) {
    throw HttpErrorCreator(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
    token,
  });
};

export default signin;
