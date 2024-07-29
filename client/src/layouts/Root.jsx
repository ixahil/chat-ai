import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components";
import { fetcher } from "../lib/fetcher";
import { useAuth } from "./AuthProvider";

const RootLayout = () => {
  const { setData } = useAuth();

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async ({ signal }) => await fetcher("users/me", signal),
  });

  useEffect(() => {
    setData(userData);
  }, [userData]);

  return (
    <div className="h-screen px-16 py-10">
      <Header />
      <main className="h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
