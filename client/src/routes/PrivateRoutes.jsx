import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PageLoader } from "../components/ui";
import { fetcher } from "../lib/fetcher";
import { useAuth } from "../layouts/AuthProvider";

const PrivateRoutes = () => {
  const { setData } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async ({ signal }) => await fetcher("users/me", signal),
  });

  useEffect(() => {
    if (data) setData(data);
  }, [data]);

  if (isLoading) return <PageLoader />;

  return data ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default PrivateRoutes;
