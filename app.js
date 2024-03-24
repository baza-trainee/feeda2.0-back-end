import express from "express";
import cors from "cors";
import "dotenv/config";

// import contactsRouter from "./routes/api/contacts-routes.js";
// import usersRouter from "./routes/api/users-routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
// app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
