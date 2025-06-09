import React, { use } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const MainLayout = () => {
  const { loading } = use(AuthContext);

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
