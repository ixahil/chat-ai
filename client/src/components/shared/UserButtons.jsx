import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { fetcher } from "../../lib/fetcher";

const UserButtons = ({ data }) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["user"],
    mutationFn: async () => fetcher("users/logout"),
    onSuccess: () => {
      queryClient.setQueryData(["user"], () => null);
      toast.success("Logged out successfully");
      navigate("/");
    },
  });

  const handleLogout = () => {
    mutate();
  };

  return (
    <div className="flex gap-4 items-center">
      <span className="px-4 py-2 bg-white border-primaryBlue border-2 rounded-lg text-primaryBlue">
        {"Hola " + data.username}
      </span>
      <Link to={"/dashboard"}>
        <button className="px-4 py-2 rounded-lg bg-primaryBlue">
          Go to App
        </button>
      </Link>

      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-lg bg-primaryBlue border-primaryBlue hover:bg-white hover:text-primaryBlue"
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserButtons;
