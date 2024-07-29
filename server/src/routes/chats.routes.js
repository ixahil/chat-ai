import { Router } from "express";
import {
  createChats,
  getAChat,
  updateChat,
} from "../controllers/chats.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const chatsRouter = Router();

chatsRouter.post("/new", authenticate, createChats);
chatsRouter.get("/:id", authenticate, getAChat);
chatsRouter.put("/:id", authenticate, updateChat);

export default chatsRouter;
