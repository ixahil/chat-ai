import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const fetcher = async (endpoint, signal) => {
  const response = await client.get(endpoint, { signal });
  const data = await response.data;
  return data;
};

export const mutateFn = async (endpoint, body, signal) => {
  const response = await client.post(endpoint, body, { signal });
  const data = await response.data;
  return data;
};
