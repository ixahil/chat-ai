import { Loader } from "lucide-react";
import React from "react";

const PageLoader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader className="animate-spin" size={44} />
    </div>
  );
};

export default PageLoader;
