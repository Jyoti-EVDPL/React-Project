import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Sidebar.css";
// import 'boxicons';

//Nav Bar import
import { useContext, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import PropTypes from 'prop-types';
import showTime from './showTime';
import Timer from './showTime';
import About from '../../Pages/Dashboard/About';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContextProvider';
import PermissionCheck from '../../Pages/Authentication/PermissionCheck';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    //Nav Bar Imports
    const { user, logout } = useContext(UserContext);
    const Navigate = useNavigate();

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="collapse d-lg-block sidebar collapse text-dark  border rounded-3 fixed-left">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h3>DeXteR</h3>
                        <button className="sidebar-toggle" onClick={handleToggle}>
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                    <ul
                        className={
                            isOpen ? "sidebar-menu active" : "sidebar-menu"
                        }
                    >
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/About">About</Link>
                        </li>
                        <li>
                            <Link className="nav-link disabled" to="/" tabIndex="-1" aria-disabled="true">(Disabled)</Link>
                        </li>
                        <li>
                            <Link to="/Todo">Todo</Link>
                        </li>
                        <PermissionCheck claim="emailtemplate">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/AddEmailTemp" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    EmailTemplate
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <PermissionCheck claim="emailtemplate_add">
                                        <li><Link className="dropdown-item" to="/AddEmailTemp">Add Templates</Link></li>
                                    </PermissionCheck>
                                    <PermissionCheck claim="emailtemplate_view">
                                        <li><Link className="dropdown-item" to="/ViewEmailTemp">View Templates</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                    </PermissionCheck>
                                </ul>
                            </li>
                        </PermissionCheck>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                DropPannel
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/Api_Testing">Api_Testing</Link></li>
                                <li><Link className="dropdown-item" to="/">Another action</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            {/* {user ? <a>{user.name}</a> : <a>User</a>} */}
                            {user.isLoggedIn ?
                                <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user.name}</Link> :
                                <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    User</Link>}
                            {user.isLoggedIn ? <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link onClick={logout} className="dropdown-item" to="/auth/SignIn">Logout</Link></li>
                                <li><Link className="dropdown-item" to="/UpdateProfile">Profile</Link></li>
                                <li><Link className="dropdown-item" to="/UploadImg">ProfilePic</Link></li>
                                <li><hr className="dropdown-divider" /></li>

                            </ul> :
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/auth/SignIn">SignIn</Link></li>
                                    <li><Link className="dropdown-item" to="/auth/SignUp">SignUp</Link></li>
                                    <li><Link className="dropdown-item" to="/auth/DemoSignin">Having Issue with SignIn</Link></li>
                                    <li><Link className="dropdown-item" to="/auth/DemoSignUp">Having Issue with SignUn</Link></li>
                                    <li><Link className="dropdown-item" to="/auth/ForgotPassword">Forgot Password</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                </ul>}
                        </li>
                        {user.isLoggedIn ?
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    AdminPannel
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/Admin">Admin Home</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/Admin/Roles/View">Manage Roles</Link></li>
                                    <li><Link className="dropdown-item" to="/">Manage Address</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/users/list">Manage Users</Link></li>
                                    <li><Link className="dropdown-item" to="/">Other Changes</Link></li>
                                </ul>
                            </li> : <></>}
                        <PermissionCheck claim="configuration">
                            <li className="nav-item">
                                <Link className="nav-link" to="/Config/View">Configuration</Link>
                            </li>
                        </PermissionCheck>
                    </ul>
                </div>
            </nav>

            {/* <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-auto bg-light sticky-top">
                        <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
                            <Link href="/" className="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                                <i className="bi-bootstrap fs-1"></i>
                            </Link>
                            <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                                <li className="nav-item">
                                    <Link href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                                        <i className="bi-house fs-1">nbsdf</i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                                        <i className="bi-speedometer2 fs-1">nbsdf</i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Orders">
                                        <i className="bi-table fs-1">nbsdf</i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Products">
                                        <i className="bi-heart fs-1">nbsdf</i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Customers">
                                        <i className="bi-people fs-1">nbsdf</i>
                                    </Link>
                                </li>
                            </ul>
                            <div className="dropdown">
                                <Link href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi-person-circle h2"></i>
                                </Link>
                                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                                    <li><Link className="dropdown-item" href="#">New project...</Link></li>
                                    <li><Link className="dropdown-item" href="#">Settings</Link></li>
                                    <li><Link className="dropdown-item" href="#">Profile</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm p-3 min-vh-100">
                        <!-- content -->
                    </div>
                </div>
            </div> */}



            {/* <div className="wrapper d-flex align-items-stretch">
                <nav id="sidebar">
                    <div className="custom-menu">
                        <button type="button" id="sidebarCollapse" className="btn btn-primary">
                            <i className="fa fa-bars"></i>
                            <span className="sr-only">Toggle Menu</span>
                        </button>
                    </div>
                    <div className="p-4">
                        <h1>
                            <a href="index.html" className="logo"
                            >Portfolic <span>Portfolio Agency</span></a
                            >
                        </h1>
                        <ul className="list-unstyled components mb-5">
                            <li className="active">
                                <Link to="/"><span className="fa fa-home mr-3"></span> Home</Link>
                            </li>
                            <li>
                                <Link to="/About"><span className="fa fa-user mr-3"></span> About</Link>
                            </li>
                            <li>
                                <a href="#"><span className="fa fa-briefcase mr-3"></span> Works</a>
                            </li>
                            <li>
                                <a href="#"><span className="fa fa-sticky-note mr-3"></span> Blog</a>
                            </li>
                            <li>
                                <a href="#"><span className="fa fa-suitcase mr-3"></span> Gallery</a>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    DropPannel
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/Api_Testing">Api_Testing</Link></li>
                                    <li><Link className="dropdown-item" to="/">Another action</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"><span className="fa fa-cogs mr-3"></span> Services</a>
                            </li>
                            <li>
                                <a href="#"
                                ><span className="fa fa-paper-plane mr-3"></span> Contacts</a
                                >
                            </li>
                        </ul>

                        <div className="mb-5">
                            <h3 className="h6 mb-3">Subscribe for newsletter</h3>
                            <form action="#" className="subscribe-form">
                                <div className="form-group d-flex">
                                    <div className="icon"><span className="icon-paper-plane"></span></div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Email Address"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="footer">
                            <p>
                                <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                                Copyright &copy;
                                <script>
                                    document.write(new Date().getFullYear());
                                </script>
                                All rights reserved | This template is made with
                                <i className="icon-heart" aria-hidden="true"></i> by
                                <a href="https://colorlib.com" target="_blank">Colorlib.com</a>
                                <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                            </p>
                        </div>
                    </div>
                </nav>

                <!-- Page Content  -->
                <div id="content" className="p-4 p-md-5 pt-5">
                    <h2 className="mb-4">Sidebar #05</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div> */}
        </>
    )
};

export default Sidebar;
