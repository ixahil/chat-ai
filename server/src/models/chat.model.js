import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    history: [
      {
        role: {
          type: String,
          enum: ["user", "model"],
          required: true,
        },
        parts: [
          {
            text: {
              type: String,
              required: true,
            },
          },
        ],
        image: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", chatSchema);

export default Chat;
