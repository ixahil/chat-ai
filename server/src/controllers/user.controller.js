import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { ApiError, generateAccessAndRefreshTokens } from "../utils/index.js";
import { cookieOptions } from "../utils/index.js";

export const createNewUser = AsyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json(new ApiResponse(201, null, "Registered successfully"));
});

export const loginUser = AsyncHandler(async (req, res, next) => {
  const { username, password: candidatePassword } = req.body;
  const user = await User.findOne({ username });
  if (!user) throw new ApiError(400, "Invalid Credentials");
  const isMatch = await user.comparePassword(candidatePassword);
  if (!isMatch) throw new ApiError(400, "Invalid Credentials");

  const { password, _id, ...verifiedUser } = user._doc;

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user
  );

  res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(201, verifiedUser, "User logged in successfully"));
});

export const getChatByUser = AsyncHandler(async (req, res) => {
  const { userId } = req.auth;

  const userChats = await User.findOne({ userId: userId });
  res.status(200).json(new ApiResponse(200, userChats.chats));
});

export const getLoggedInUser = AsyncHandler(async (req, res) => {
  const { _id, ...user } = req.auth._doc;
  res.status(200).json(new ApiResponse(200, user));
});

export const logoutUser = AsyncHandler(async (req, res, next) => {
  res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});
