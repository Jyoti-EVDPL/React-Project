import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div>
      {/* <h1>This Is auth Layout</h1> */}
      {/* <div>AuthLayout</div> */}
      {/* <Outlet data="this data is from outlet"/> */}
      <Outlet />
    </div>
  );
}

export default AuthLayout;
