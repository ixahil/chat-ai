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

// Middleware setup
// app.use(
//   cors({
//     origin: process.env.ORIGIN,
//     credentials: true,
//   })
// );

app.use(express.static(path.join(__dirname, "../dist"))); // Serve static files

app.set("views", path.join(__dirname, "../views"));

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
app.use(cookieParser());
app.set("view engine", "ejs");

// API route
app.get("/api", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.render("pages/index", { endpoints });
});

// API Routes
import chatsRouter from "./routes/chats.routes.js";
import userRouter from "./routes/user.routes.js";

app.get("/api/v1/upload", (req, res) => {
  const result = ImageKit.getAuthenticationParameters();
  res.send(result);
});

app.use("/api/v1/chats", chatsRouter);
app.use("/api/v1/users", userRouter);

// Serve index.html for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// Error handling middleware
app.use(errorHandler);

// Start server
const startServer = () => {
  app.listen(port, () => {
    console.log(` ⚙️  Server is running on port ${port}`);
  });
};

try {
  await connection();
  startServer();
} catch (error) {
  console.log("MongoDB Error: " + error);
}

export default app;
