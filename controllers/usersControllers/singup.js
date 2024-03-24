import bcryptjs from "bcryptjs";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import { User } from "../../models/index.js";
import { HttpErrorCreator, sendEmail } from "../../helpers/index.js";

const { LOCAL_URL } = process.env;

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpErrorCreator(409, "Email in use");
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmailMessage = {
    to: email,
    subject: "Please, verify your email",
    html: `<a target='_blank' href='${LOCAL_URL}/api/users/verify/${verificationToken}'>Click here to verify your email</a>`,
  };

  await sendEmail(verifyEmailMessage);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export default signup;
