import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";

export const createChats = AsyncHandler(async (req, res) => {
  const { _id: userId } = req.auth;
  const { prompt } = req.body;
  // creating new chat
  const newChat = new Chat({
    userId,
    history: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const savedChat = await newChat.save();

  const user = await User.findByIdAndUpdate(userId, {
    $push: {
      chats: {
        _id: savedChat._id,
        title: prompt.substring(0, 40),
      },
    },
  });

  res.status(201).json(new ApiResponse(201, savedChat));
});

export const getAChat = AsyncHandler(async (req, res) => {
  const { _id: userId } = req.auth;

  const chat = await Chat.findOne({ _id: req.params.id, userId });
  res.status(200).json(new ApiResponse(200, chat));
});

export const updateChat = AsyncHandler(async (req, res) => {
  const { _id: userId } = req.auth;
  const { question, answer, image } = req.body;

  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(image && { image }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

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
  res.status(200).json(new ApiResponse(200, updatedChat));
});

export const deleteChat = AsyncHandler(async (req, res, next) => {
  const { _id: userId } = req.auth;
  const user = await User.findByIdAndUpdate(userId, {
    $pull: {
      chats: {
        _id: req.params.id,
      },
    },
  });

  res.status(204).json(new ApiResponse(204));
});
