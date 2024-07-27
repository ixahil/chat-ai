import "./user.css";
import { useAuth, UserButton, UserProfile, useUser } from "@clerk/clerk-react";
import React from "react";
import { Link, useResolvedPath } from "react-router-dom";

const User = () => {
  const path = useResolvedPath();
  const { user } = useUser();
  return (
    <div className="user-section">
      <Link
        to={path.pathname.includes("/dashboard") ? "/" : "/dashboard"}
        className="link"
      >
        {path.pathname.includes("/dashboard") ? "Go to Home" : "Go to App"}
      </Link>
      <div className="user">
        <h4>{user.emailAddresses[0].emailAddress}</h4>
        <UserButton />
      </div>
    </div>
  );
};

export default User;
