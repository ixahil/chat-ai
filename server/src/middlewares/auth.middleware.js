import User from "../models/user.model.js";
import { ApiError, AsyncHandler } from "../utils/index.js";
import jwt from "jsonwebtoken";

export const authenticate = AsyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized Request!");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESSTOKENSECRET);
    const user = await User.findOne({ _id: decoded._id }).select("-password");

    if (!user) {
      res.clearCookie("accessToken").clearCookie("refreshToken");
      throw new ApiError(401, "Unauthorized Request!");
    }
    req.auth = user;
    next();
  } catch (error) {
    res.clearCookie("accessToken").clearCookie("refreshToken");
    throw new ApiError(401, "Unauthorized Request!");
  }
});
