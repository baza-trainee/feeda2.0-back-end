import { User } from "../../models/index.js";

export const updateUserSubscription = async (req, res) => {
  const { subscription } = req.body;

  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, { subscription }, { new: true });

  res.json({
    user: {
      email: user.email,
      subscription,
    },
  });
};

export default updateUserSubscription;
