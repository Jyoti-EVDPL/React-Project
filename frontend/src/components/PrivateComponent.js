import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContextProvider';
const privateComponent = () => {
    // const auth = localStorage.getItem('logintoken');
    // return auth ? <Outlet /> : <Navigate to="auth/SignIn" />
    const { user } = useContext(UserContext)
    console.log("sdfihbvsoi" + user.isLoggedIn)
    return user.isLoggedIn ? <Outlet /> : <Navigate to="auth/SignIn" />

    // if (user.isLoggedIn = false) {
    //     alert('You must be logged in First');
    //     <Navigate to="auth/SignIn" />
    // }

    // const auth1 = localStorage.getItem('user-provider');
    // return auth1 ? <Outlet /> : <Navigate to="/SignIn" />
}
export default privateComponent;