// loaders/authLoader.js

import { defer } from "react-router-dom";
import { fetcher } from "../lib/fetcher";

export const authLoader = async () => {
  // const data = await fetcher("users/me");
  return { userData: data };
  return defer({
    userData: dataPromise,
  });
};
