import React, { createContext, useContext, useState } from "react";
import { fetcher } from "@lib";
import { useQuery } from "@tanstack/react-query";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const [data, setData] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await fetcher("users/me"),
  });

  return (
    <AuthContext.Provider value={{ data, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
