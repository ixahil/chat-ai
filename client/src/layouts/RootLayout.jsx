import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components";
import { useAuth } from "../providers/AuthProvider";
import { PageLoader } from "@components/ui";

const RootLayout = () => {
  const { isLoading } = useAuth();

  if (isLoading) return <PageLoader />;
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
