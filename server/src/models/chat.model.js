import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
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
