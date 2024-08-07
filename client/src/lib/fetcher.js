import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const fetcher = async (endpoint, signal) => {
  const response = await client.get(endpoint, { signal });
  const { data } = await response.data;
  return data;
};

export const mutateFn = async (
  endpoint,
  body = {},
  method = "POST",
  config = {}
) => {
  let response;

  if (method === "POST") {
    response = await client.post(endpoint, body, { ...config });
  }
  if (method === "PUT") {
    response = await client.put(endpoint, body, { ...config });
  }
  if (method === "DELETE") {
    response = await client.delete(endpoint, { ...config });
  }
  const { data } = await response.data;

  return data;
};
