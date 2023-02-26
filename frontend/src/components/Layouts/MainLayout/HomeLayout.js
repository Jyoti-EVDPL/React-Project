import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PrivateComponent from "../../PrivateComponent";
import HomePage from "../../Pages/Dashboard/HomePage";
import { UserContext } from "../../UserContextProvider";
import Sidebar from "./Sidebar";

function HomeLayout() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Sidebar/>
      <Navbar title="DExtER" />
      {/* <HomePage/> */}
      {/* <PrivateComponent/> */}
      <Outlet />
      <Footer />
    </>
  );
}

export default HomeLayout;
