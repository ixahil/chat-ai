import DashboardLayout from "@layouts/Dashboard";
import RootLayout from "@layouts/Root";
import {
  ChatPage,
  DashboardPage,
  HomePage,
  SignInPage,
  SignUpPage,
} from "@routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";
import { AuthProvider } from "./layouts/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: "/dashboard",
                element: <DashboardPage />,
              },
              {
                path: "/dashboard/chats/:id",
                element: <ChatPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: 0,
      retryDelay: 10000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <Toaster position="top-center" />
  </React.StrictMode>
);
