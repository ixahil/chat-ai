import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { fetcher, mutateFn } from "../lib/fetcher";
import { Link, Router, useNavigate } from "react-router-dom";
import { DeleteIcon, Loader, Trash, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

const ChatList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => await fetcher("users/chats"),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => await mutateFn(`users/chats/${id}`, {}, "DELETE"),
    onSuccess: () => {
      toast.success("Chat Deleted");
      queryClient.invalidateQueries(["chats"]);
      navigate("/dashboard");
    },
  });

  const handleDelete = (id) => {
    mutate(id);
  };

  return (
    <div className="flex flex-col h-full py-8 items-start">
      <span className="font-semibold text-xs mb-3">Dashboard</span>
      <Link
        className="p-3 rounded-xl hover:bg-[#2c2937] w-full text-left"
        to={"/dashboard"}
      >
        Create a new Chat
      </Link>
      <Link
        className="p-3 rounded-xl hover:bg-[#2c2937] w-full text-left"
        to={"/dashboard"}
      >
        Explore Chat Ai
      </Link>
      <Link
        className="p-3 rounded-xl hover:bg-[#2c2937] w-full text-left"
        to={"/dashboard"}
      >
        Contact
      </Link>
      <hr />
      <div className="flex flex-col w-full items-start overflow-auto">
        <span className="font-semibold text-xs mb-3">Recent Chats</span>
        {isLoading ? (
          <Loader className="animate-spin" />
        ) : error ? (
          <span>"Something went wrong!"</span>
        ) : (
          data.map((v, k) => (
            <div
              key={v._id}
              className="p-3 rounded-xl hover:bg-[#2c2937] flex items-center w-full"
            >
              <Link
                className="w-full text-left"
                to={`/dashboard/chats/${v._id}`}
              >
                {v.title}
              </Link>
              <button
                onClick={() => handleDelete(v._id)}
                className="justify-end"
              >
                {isPending ? <Loader className="animate-spin" /> : <Trash />}
              </button>
            </div>
          ))
        )}
      </div>
      <hr />
      <div className="mt-auto flex items-center gap-3 text-xs">
        <img src="/logo.png" className="size-[24px]" alt="" />
        <div className="flex flex-col">
          <span className="font-semibold">Upgrade to Chat Ai Pro</span>
          <span className="text-[#888]">
            Get Unlimited Access to All Features
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
