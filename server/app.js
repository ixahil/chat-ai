import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import { connection } from "./db/dbConnection.js";
import Chat from "./models/chat.model.js";
import UserChats from "./models/userChats.model.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

app.get("/api/v1/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post("/api/v1/chats", ClerkExpressRequireAuth(), async (req, res) => {
  const { userId } = req.auth;
  const { prompt } = req.body;
  try {
    // creating new chat
    const newChat = new Chat({
      userId,
      history: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const savedChat = await newChat.save();

    // check if userchats exists
    const userChats = await UserChats.find({ userId: userId });

    // if not exists creates a new one and the chats array
    if (!userChats.length) {
      const newUserChats = new UserChats({
        userId,
        chats: [
          {
            _id: savedChat._id,
            title: prompt.substring(0, 40),
          },
        ],
      });

      await newUserChats.save();
    } else {
      // if exists push the chats to the existing array
      await UserChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: prompt.substring(0, 40),
            },
          },
        }
      );
    }

    res.status(201).send(newChat._id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/v1/userChats", ClerkExpressRequireAuth(), async (req, res) => {
  const { userId } = req.auth;
  try {
    const userChats = await UserChats.findOne({ userId: userId });
    res.status(200).json(userChats.chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.get("/api/v1/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const { userId } = req.auth;
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.put("/api/v1/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const { userId } = req.auth;
  const { question, answer, image } = req.body;

  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(image && { image }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.findOneAndUpdate(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(updatedChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(401).json({ message: "Unauthorized!" });
});

app.listen(port, () => {
  connection();
  console.log(`Server is running on port ${port}`);
});
