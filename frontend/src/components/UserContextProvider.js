import React, { createContext, useEffect, useState } from 'react'
export const UserContext = createContext({});
import jwt_decode from "jwt-decode";

function UserContextProvider({ children }) {
    // token: 'some token', isLoggedIn: false, name: 'test User'
    const [user, setUser] = useState({});
    const [template, setTemplates] = useState({});
    const [location, setLocation] = useState({});
    const [claims, setClaims] = useState([]);
    // const [logintoken, setLogintoken] = useState("")
    // const []
    // const [token, setToken] = useState('');

    useEffect(() => {
        let data = localStorage.getItem('user-provider');
        if (data) {
            setUser(JSON.parse(data));
        }
    }, []);

    // useEffect(() => {
    //     const claimsLdata = JSON.stringify(localStorage.getItem('logindata'));
    //     const token_claim = jwt_decode(claimsLdata);
    //     const claims1 = token_claim.claim
    //     console.log("claims data from token")
    //     console.log(claims)
    //     setClaims(claims1)
    // }, []);
    // console.log(claims)




    const setUserLogin = (data) => {
        localStorage.setItem('user-provider', JSON.stringify(data));
        setUser(data);
        // setLogintoken(data.logintoken);

    }

    useEffect(() => {
        let temp = localStorage.getItem('template-data');
        if (temp) {
            setUser(JSON.parse(temp));
        }
    }, []);

    const setTemp = (temp) => {
        localStorage.setItem('template-data', JSON.stringify(temp));
        setTemplates(temp);
    }

    const logout = () => {
        const lgdata = ({ logintoken: null, isLoggedIn: false, name: null })
        localStorage.setItem('user-provider', JSON.stringify(lgdata));
        console.log(user)

        //prev option
        // setUser({ logintoken: null, isLoggedIn: false, name: null });
        // localStorage.setItem(user);
        // console.log(user)
    };
    const UserLocation = () => {
        localStorage.setItem('user-location', JSON.stringify(loc));
        setUser(loc);
    };
    useEffect(() => {
        let loc = localStorage.getItem('user-location');
        if (loc) {
            setUser(JSON.parse(loc));
        }
    }, []);

    return (
        <div>
            <UserContext.Provider value={{ user, template, setUserLogin, setTemp, logout, UserLocation }}>
                {children}
            </UserContext.Provider>
        </div>
    )
}

export default UserContextProvider