import app from "./app.js";
import mongoose from "mongoose";

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  )
  .catch((er) => {
    console.log(er.message);
    process.exit(1);
  });
