import { Loader } from "lucide-react";
import React from "react";

const LoadingButton = ({ isLoading, className, children, ...props }) => {
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 ${className}`}
      disabled={isLoading}
    >
      {isLoading && <Loader className="animate-spin" />}
      {children}
    </button>
  );
};

export default LoadingButton;
