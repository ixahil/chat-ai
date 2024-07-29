import mongoose from "mongoose";
import { ApiError } from "../utils/index.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    const message = error.message || "Something went wrong!";
    error = new ApiError(statusCode, message, error?.errors || [], error.stack);
  }

  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)}: ${Object.values(
      err.keyValue
    )} is already exists`;

    console.log(message);

    error = new ApiError(400, message, err?.errors || [], err.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "developement" ? { stack: error.stack } : {}),
  };

  return res.status(error.statusCode).json(response);
};

export default errorHandler;
