import cors from "cors";
import express from "express";
import expressListEndpoints from "express-list-endpoints";
import ImageKit from "imagekit";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { connection } from "./db/dbConnection.js";
import errorHandler from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.set("views", path.join(__dirname, "../views"));

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
app.use(cookieParser());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.render("pages/index", { endpoints });
});

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Routes
import chatsRouter from "./routes/chats.routes.js";
import userRouter from "./routes/user.routes.js";

app.get("/api/v1/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.use("/api/v1/chats", chatsRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandler);

app.listen(port, () => {
  connection();
  console.log(`Server is running on port ${port}`);
});

export default app;
