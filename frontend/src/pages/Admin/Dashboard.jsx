import React from "react";
import { useAuthStore } from "../../store/useAuthStore";

const Dashboard = () => {
  const { authUser } = useAuthStore();
  console.log("authUser: ", authUser);
  return <div>Dashboard</div>;
};

export default Dashboard;
