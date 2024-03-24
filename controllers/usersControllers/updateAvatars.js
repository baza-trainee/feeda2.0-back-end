import { User } from "../../models/index.js";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";

export const updateAvatars = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempPath, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const avatarsPath = path.resolve("public", "avatars", fileName);
  const avatarURL = path.join("avatars", fileName);
  try {
    const image = await Jimp.read(tempPath);
    await image.resize(250, 250);
    await image.writeAsync(tempPath);

    await fs.rename(tempPath, avatarsPath);
  } catch (error) {
    await fs.unlink(tempPath);
    return next(error);
  }

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

export default updateAvatars;
