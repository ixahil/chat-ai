import { useAuth } from "@clerk/clerk-react";
import "./dashboardLayout.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { ChatList } from "../../components";
const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [userId, isLoaded, navigate]);

  if (!isLoaded) return <Loader />;
  else
    return (
      <div className="dashboardLayout">
        <div className="menu">
          <ChatList />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
};

export default DashboardLayout;
