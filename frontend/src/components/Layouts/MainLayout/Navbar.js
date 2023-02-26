import React, { useContext, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import PropTypes from 'prop-types';
import showTime from './showTime';
import Timer from './showTime';
import About from '../../Pages/Dashboard/About';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContextProvider';
import PermissionCheck from '../../Pages/Authentication/PermissionCheck';


//or by like this:using useEffect
// export default function Navbar(props) {
//     const Navigate = useNavigate();
//     const Logout = () => {
//         localStorage.removeItem('token');
//         alert('Logged out Successfully');
//         Navigate("/SignIn");
//     };
//     const [auth, setAuth ] = useState(null);
//     useEffect(() => {
//         const auth = localStorage.getItem('token');
//         setAuth(auth);
//     }, []);
// const { userdet } = useContext(UserContext);

export default function Navbar(props) {
    const { user, logout } = useContext(UserContext);
    const Navigate = useNavigate();
    console.log("RENDERING UN-NECESSARY IN NAVBAR")
    
    //FOR LOGOUT(PREVIOUSLY USED)
    const Logout = () => {
        localStorage.removeItem('logintoken');
        localStorage.removeItem('user-provider');
        alert('Logged out Successfully');
        Navigate("/SignIn");
    };
    //FOR CHECKING CLAIM(PREVIOUSLY USED)
    const checkisClaimExist = (claim) => {
        // var decoded = jwt_decode(user.logintoken);
        // "?.logintoken;" "?" means if we got null then we got token directly
        const token = localStorage.getItem('logintoken')?.logintoken;
        var decoded = jwt_decode(token);
        const claims = decoded.claim;
        return claims.includes(claim);
    }

    return (
        <div>
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-success p-2 text-dark bg-opacity-25 border rounded-3 fixed-top"> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white p-2 text-dark  border rounded-3 fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bolder text-primary bg-" to="/">{props.title}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/About">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link disabled" to="/" tabIndex="-1" aria-disabled="true">(Disabled)</Link>
                            </li>
                            <li><abbr title='Disable Dark Mode'></abbr></li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Todo">Todo</Link>
                            </li>
                            <PermissionCheck claim="emailtemplate">
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="/AddEmailTemp" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        EmailTemplate
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><hr className="dropdown-divider" /></li>
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
                                    {/* <li>{auth?<Link onClick={Logout} className="dropdown-item" to="/Logout">Logout</Link>:<Link className="dropdown-item" to="/SignIn">SignIn</Link>}</li> */}
                                    {/* <li>{auth ? <Link onClick={logout} className="dropdown-item" to="/auth/SignIn">Logout</Link> : <Link className="dropdown-item" to="/auth/SignIn">SignIn</Link>}</li>
                                    <li>{auth ? <Link className="dropdown-item" to="/Logout"></Link> : <Link className="dropdown-item" to="/auth/SignUp">SignUp</Link>}</li>
                                    <li></li>
                                    <li><Link className="dropdown-item" to="/UpdateProfile">Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/UploadImg">ProfilePic</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="/auth/DemoSignin">Having Issue with SignIn</Link></li>
                                    <li><Link className="dropdown-item" to="/auth/DemoSignUp">Having Issue with SignUn</Link></li>
                                    <li><Link className="dropdown-item" to="/auth/ForgotPassword">Forgot Password</Link></li> */}
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

                        <div className={`navbar justify-content-end `}>
                            <div className="form-check form-switch mx-4">
                                <abbr title={(props.mode === "light" ? "Enable" : "Disable") + " Dark Mode"}>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.toggleMode} />
                                </abbr>
                            </div>
                        </div>
                        <form className="d-flex">
                            <Link className="nav-link active" aria-current="page" to="/"><Timer /></Link>
                        </form>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        {/* <!-- Right elements --> */}
                        {/* <!-- Notifications --> */}
                        <li className="nav-item dropdown d-flex mx-2">
                            <Link
                                className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-bell"></i>
                                <span className="badge rounded-pill badge-notification bg-danger">1</span>
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="#">Some news</Link></li>
                                <li><Link className="dropdown-item" to="#">Another news</Link></li>
                                <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                            </ul>
                        </li>
                        {/* <!-- Avatar --> */}
                        <div className="dropdown">
                            <Link
                                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                to="#"
                                id="navbarDropdownMenuAvatar"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                    className="rounded-circle"
                                    height="25"
                                    alt="Black and White Portrait of a Man"
                                    loading="lazy"
                                />
                            </Link>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuAvatar"
                            >
                                <li>
                                    <Link className="dropdown-item" to="#">My profile</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="#">Settings</Link>
                                </li>
                                <li>
                                    <Link onClick={logout} className="dropdown-item" to="/auth/DemoSignIn">Logout</Link>
                                </li>
                            </ul>
                        </div>
                        {/* <!-- Right elements --> */}
                    </div>
                </div>
            </nav>
        </div>
    )
}