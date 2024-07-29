import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../layouts/AuthProvider";
import SignInButtons from "./shared/SignInButtons";
import UserButtons from "./shared/UserButtons";

const Header = () => {
  const { data } = useAuth();

  return (
    <header className="flex justify-between items-center">
      <Link to={"/"} className="flex items-center gap-2">
        <img src="/logo.png" alt="" className="size-12" />
        <span>Chat Ai</span>
      </Link>
      {data ? <UserButtons data={data} /> : <SignInButtons />}
    </header>
  );
};

export default Header;
