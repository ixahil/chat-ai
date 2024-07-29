import { Router } from "express";
import {
  getChatByUser,
  createNewUser,
  loginUser,
  getLoggedInUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { deleteChat } from "../controllers/chats.controller.js";

const userRouter = Router();

userRouter.post("/register", createNewUser);
userRouter.post("/login", loginUser);
userRouter.get("/chats", authenticate, getChatByUser);
userRouter.get("/me", authenticate, getLoggedInUser);
userRouter.get("/logout", authenticate, logoutUser);

userRouter.delete("/chats/:id", authenticate, deleteChat);

export default userRouter;
