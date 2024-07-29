import React from "react";
import { Link } from "react-router-dom";

const SignInButtons = () => {
  return (
    <div className="flex gap-4 items-center">
      <Link to={"/sign-up"}>
        <button className="px-4 py-2 rounded-lg bg-primaryBlue">Sign Up</button>
      </Link>
      <Link to={"/sign-in"}>
        <button className="px-4 py-2 rounded-lg bg-primaryBlue">Sign In</button>
      </Link>
    </div>
  );
};

export default SignInButtons;
