import "./rootLayout.css";
import { Link, Outlet } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import User from "../../components/user/User";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}>
      <QueryClientProvider client={queryClient}>
        <div className="rootLayout">
          <header>
            <Link to={"/"} className="logo">
              <img src="/logo.png" alt="" />
              <span>Chat Ai</span>
            </Link>
            <div className="user">
              <SignedOut>
                <Link to={"/sign-in"}>
                  <button className="btn">Sign In</button>
                </Link>
              </SignedOut>
              <SignedIn>
                <User />
              </SignedIn>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
