import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const ACCESSTOKENSECRET = process.env.ACCESSTOKENSECRET;
const REFRESHTOKENSECRET = process.env.REFRESHTOKENSECRET;

const ACCESSTOKENEXPIRATION = process.env.ACCESSTOKENEXPIRATION;
const REFRESHTOKENEXPIRATION = process.env.REFRESHTOKENEXPIRATION;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: {
        unique: true,
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: {
        unique: true,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    chats: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "chat",
        },
        title: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Hash the password before saving the user document
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    ACCESSTOKENSECRET,
    { expiresIn: ACCESSTOKENEXPIRATION }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, REFRESHTOKENSECRET, {
    expiresIn: REFRESHTOKENEXPIRATION,
  });
};

const User = mongoose.model("user", userSchema);

export default User;
