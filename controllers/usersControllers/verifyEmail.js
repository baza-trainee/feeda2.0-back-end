import { User } from "../../models/index.js";
import { HttpErrorCreator } from "../../helpers/index.js";

export const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpErrorCreator(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

  res.json({ message: "Verification successful" });
};

export default verifyEmail;
