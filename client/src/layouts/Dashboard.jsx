import { Outlet } from "react-router-dom";
import { ChatList } from "../components";

const DashboardLayout = () => {
  return (
    <div className="flex gap-12 py-10 h-full">
      <div className="w-1/5">
        <ChatList />
      </div>
      <div className="w-4/5 bg-[#12101b] p-5 rounded-2xl">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
