import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PageLoader } from "../components/ui";
import { fetcher } from "../lib/fetcher";
import { useAuth } from "./AuthProvider";

const PrivateRoutes = () => {
  const { data, isLoading } = useAuth();

  // const [isLoading, setIsLoading] = useState(true);

  // if (!data) {
  //   const { data: resData, isLoading } = useQuery({
  //     queryKey: ["user"],
  //     queryFn: async () => await fetcher("users/me"),
  //   });

  //   console.log(resData);
  // }

  // useEffect(() => {
  //   // if (data) setData(data);
  //   if (!data) {
  //     const { data, isLoading } = useQuery({
  //       queryKey: ["user"],
  //       queryFn: async () => await fetcher("users/me"),
  //     });

  //     console.log(data);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (data) setIsLoading(false);
  // }, [data]);

  if (isLoading) return <PageLoader />;

  return data ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default PrivateRoutes;
