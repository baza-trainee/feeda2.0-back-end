import { controllerDecorator } from "../../helpers/index.js";
import signup from "./singup.js";
import signin from "./singin.js";
import verifyEmail from "./verifyEmail.js";
import resendVerificationEmail from "./resendVerificationEmail.js";
import getCurrent from "./getCurrent.js";
import signout from "./signout.js";
import updateUserSubscription from "./updateUserSubscription.js";
import updateAvatars from "./updateAvatars.js";

export default {
  signup: controllerDecorator(signup),
  verifyEmail: controllerDecorator(verifyEmail),
  resendVerificationEmail: controllerDecorator(resendVerificationEmail),
  signin: controllerDecorator(signin),
  getCurrent: controllerDecorator(getCurrent),
  signout: controllerDecorator(signout),
  updateUserSubscription: controllerDecorator(updateUserSubscription),
  updateAvatars: controllerDecorator(updateAvatars),
};
