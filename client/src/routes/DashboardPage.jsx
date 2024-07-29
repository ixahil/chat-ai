import React from "react";
import { Search } from "../components";

const DashboardPage = () => {
  return (
    <div className="flex flex-col select-none items-center h-full py-4">
      <div className="flex-1 flex flex-col items-center justify-center w-1/2 gap-12">
        <div className="flex items-center gap-5 opacity-25">
          <img src="/logo.png" alt="" className="size-16" />
          <h1 className="text-6xl bg-gradient-to-r from-primaryBlue to-primaryRed bg-clip-text text-transparent">
            Chat Ai
          </h1>
        </div>
        <div className="w-full flex items-center justify-between gap-12">
          <div className="flex-1 items-start flex flex-col gap-3 font-light text-xs p-5 border-2 border-[#555] rounded-3xl">
            <img className="size-10 object-cover" src="/chat.png" alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="flex-1 items-start flex flex-col gap-3 font-light text-xs p-5 border-2 border-[#555] rounded-3xl">
            <img className="size-10 object-cover" src="/image.png" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="flex-1 items-start flex flex-col gap-3 font-light text-xs p-5 border-2 border-[#555] rounded-3xl">
            <img className="size-10 object-cover" src="/code.png" alt="" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>
      <Search />
    </div>
  );
};

export default DashboardPage;
