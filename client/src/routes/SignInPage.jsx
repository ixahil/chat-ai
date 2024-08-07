import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "../components/ui";
import { mutateFn } from "../lib/fetcher";
import { useAuth } from "@providers";

const SignInpage = () => {
  const navigate = useNavigate();

  const { setData } = useAuth();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["user"],
    mutationFn: async (body) => mutateFn("users/login", body),
    onSuccess: (data) => {
      toast.success("Logged In successfully");
      setData(data);
      navigate("/dashboard");
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = {};
    for (const [key, value] of formData.entries()) {
      body[key] = value;
    }

    mutate(body);
  };

  return (
    <div className="max-w-lg m-auto h-full">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-start gap-2 w-[500px] mx-auto p-8 rounded-md"
      >
        <h2 className="text-xl my-2 mb-4">Sign In</h2>

        <label className="mt-2" htmlFor="username">
          Username
        </label>
        <input
          placeholder="Username"
          required={true}
          htmlFor="username"
          className="input"
          type="text"
          name="username"
        />
        <label className="mt-2" htmlFor="password">
          Password
        </label>
        <input
          placeholder="Password"
          required={true}
          htmlFor="password"
          className="input"
          type="password"
          name="password"
        />
        {error?.response && (
          <span className="error">{error.response.data.message}</span>
        )}
        {error?.message === "Network Error" && (
          <span className="error">{"Internal Server Error"}</span>
        )}

        <LoadingButton
          isLoading={isPending}
          type="submit"
          className="mt-4 p-4 rounded-md bg-primaryBlue w-full hover:bg-primaryBlue/40"
        >
          Sign In
        </LoadingButton>
      </form>
    </div>
  );
};

export default SignInpage;
