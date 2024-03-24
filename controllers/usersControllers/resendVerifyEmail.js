import { User } from "../../models/index.js";
import { HttpErrorCreator, sendEmail } from "../../helpers/index.js";

const { LOCAL_URL } = process.env;

export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpErrorCreator(404, "User not found");
  }
  if (user.verify) {
    throw HttpErrorCreator(400, "Verification has already been passed");
  }

  const verifyEmailMessage = {
    to: email,
    subject: "Please, verify your email",
    html: `<a target='_blank' href='${LOCAL_URL}/api/users/verify/${user.verificationToken}'>Click here to verify your email</a>`,
  };

  await sendEmail(verifyEmailMessage);

  res.json({ message: "Verification email sent" });
};

export default resendVerificationEmail;
