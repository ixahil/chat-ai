import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import "./chatList.css";
import { fetcher } from "../../lib/fetcher";

const ChatList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: async ({ signal }) => await fetcher("userChats", signal),
  });

  return (
    <div className="chatList">
      <span className="title">Dashboard</span>
      <Link to={"/dashboard"}>Create a new Chat</Link>
      <Link to={"/dashboard"}>Explore Chat Ai</Link>
      <Link to={"/dashboard"}>Contact</Link>
      <hr />
      <div className="list">
        <span className="title">Recent Chats</span>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <span>"Something went wrong!"</span>
        ) : (
          data.map((v, k) => (
            <Link to={`/dashboard/chats/${v._id}`} key={v._id}>
              {v.title}
            </Link>
          ))
        )}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to Chat Ai Pro</span>
          <span>Get Unlimited Access to All Features</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
