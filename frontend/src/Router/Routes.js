import React from "react";

// import logo from './logo.svg';
import "../App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "../components/Pages/Authentication/SignIn";
import SignUp from "../components/Pages/Authentication/SignUp";
import DemoSignin from "../components/Pages/Authentication/DemoSignin";
import DemoSignUp from "../components/Pages/Authentication/DemoSignUp";
import Logout from "../components/Layouts/MainLayout/Logout";
import TwoFAauth from "../components/Pages/Authentication/TwoFAauth";

import About from "../components/Pages/Dashboard/About";
import Todo from "../components/Pages/Dashboard/Todo";
import AddEmailTemp from "../components/Pages/Dashboard/Email/AddEmailTemp";
import ViewEmailTemp from "../components/Pages/Dashboard/Email/ViewEmailTemp";
import UpdateProfile from "../components/Pages/Dashboard/UpdateProfile";
import UploadImg from "../components/Pages/Dashboard/UploadImg";
import Api from "../components/Pages/Dashboard/Api_Testing";
import HomePage from "../components/Pages/Dashboard/HomePage";
import PrivateComponent from "../components/PrivateComponent";
import ForgotPassword from "../components/Pages/Authentication/ForgotPassword";
import UserContextProvider, {
  UserContext,
} from "../components/UserContextProvider";
import AuthLayout from "../components/Layouts/AuthLayout";
import HomeLayout from "../components/Layouts/MainLayout/HomeLayout";

import AdminHome from "../components/Pages/Dashboard/Admin/AdminHome";
import ConfigurationView from "../components/Pages/Dashboard/Configuration/ConfigurationView";
import ConfigurationAdd from "../components/Pages/Dashboard/Configuration/ConfigurationAdd";
import ConfigurationEdit from "../components/Pages/Dashboard/Configuration/ConfigurationEdit";
import Admin_User_List from "../components/Pages/Dashboard/Admin/ManageUsers/UsersList";
import RoleView from "../components/Pages/Dashboard/Admin/ManageRoles/RoleView";
import RoleAdd from "../components/Pages/Dashboard/Admin/ManageRoles/RoleAdd";
import RoleEdit from "../components/Pages/Dashboard/Admin/ManageRoles/RoleEdit";
import RoleAdd2 from "../components/Pages/Dashboard/Admin/ManageRoles/demo_add";

function allRoutes() {
  return (
    <>
      <UserContextProvider>
        <Router>
          <Routes>
            {/* <Route element={<PrivateComponent />}> */}
            <Route path="" element={<HomeLayout />}>
              <Route path="" element={<HomePage />} />
              <Route path="about" element={<About />} />
              <Route path="addemailtemp" element={<AddEmailTemp />} />
              <Route path="viewemailtemp" element={<ViewEmailTemp />} />
              <Route path="todo" element={<Todo />} />
              <Route path="UpdateProfile" element={<UpdateProfile />} />
              <Route path="UploadImg" element={<UploadImg />} />
              <Route path="Api_Testing" element={<Api />} />
              <Route path="Logout" element={<Logout />} />

              <Route path="/Admin" element={<AdminHome />} />
              <Route path="/Admin/Roles/View" element={<RoleView />} />
              <Route path="/Admin/Roles/Add" element={<RoleAdd />} />
              <Route path="/Admin/Roles/Add2" element={<RoleAdd2 />} />
              <Route path="/Admin/Roles/Edit/:role_id" element={<RoleEdit />} />
              <Route path="/users/list" element={<Admin_User_List />} />

              <Route path="Config/View" element={<ConfigurationView />} />
              <Route path="Config/Add" element={<ConfigurationAdd />} />
              <Route path="Config/Edit/:config_id" element={<ConfigurationEdit />} />
            </Route>

            {/* <Route path="SignIn" element={<SignIn />} />
            <Route path="SignUp" element={<SignUp />} />
            <Route path="demoSignin" element={<DemoSignin />} />
            <Route path="demoSignUp" element={<DemoSignUp />} />
            <Route path="ForgotPassword" element={<ForgotPassword />} />
            <Route path="TwoFAauth" element={<TwoFAauth />} /> */}

            <Route path="/auth" element={<AuthLayout />}>
              <Route path="SignIn" element={<SignIn />} />
              <Route path="SignUp" element={<SignUp />} />
              <Route path="demoSignin" element={<DemoSignin />} />
              <Route path="demoSignUp" element={<DemoSignUp />} />
              <Route path="ForgotPassword" element={<ForgotPassword />} />
              <Route path="TwoFAauth" element={<TwoFAauth />} />
            </Route>
          </Routes>
        </Router>
      </UserContextProvider>
    </>
  );
}

export default allRoutes;
