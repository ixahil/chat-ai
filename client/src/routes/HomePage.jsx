import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="grid grid-cols-2 h-full items-center justify-center gap-24">
      <img
        src="/orbital.png"
        alt=""
        className="absolute bottom-0 left-0 opacity-5 animate-rotate -z-10"
      />
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-9xl text-transparent bg-gradient-to-r from-primaryBlue to-primaryRed bg-clip-text font-bold">
          Chat Ai
        </h1>
        <h2 className="font-bold text-2xl">
          Supercharge your creativity and productivity
        </h2>
        <h3 className="font-normal max-w-[60%] text-lg">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet
          temporibus autem unde cupiditate aspernatur aliquam est, labore
        </h3>
        <Link
          className="px-8 py-4 rounded-xl mt-5 bg-primaryBlue hover:bg-white hover:text-primaryBlue"
          to={"/dashboard"}
        >
          Get Started
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center bg-darkBlue rounded-3xl w-3/4 h-1/2 relative">
          <div className="w-full h-full overflow-hidden absolute top-0 right-0 rounded-3xl">
            <div className="bg-[url('/bg.png')] opacity-5 w-[200%] h-full animate-slide bg-auto"></div>
          </div>
          <img
            src="/bot.png"
            alt=""
            className="animate-scale object-contain w-96"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
