import { Link } from "react-router-dom";
import React, { useState } from 'react'

export default function Login() {
    const [message, setMessage] = useState("")
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const handleInput = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value })
    }
    const login = (e) => {
        e.preventDefault();
        if (loginData.email === "" || loginData.password === "") {
            alert("Please Fill all the fields")
        } else {

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            }
            fetch("http://localhost:3000/auth/login", options)
                .then((res) => res.text())
                .then((data) => setMessage(data)).catch(e => console.log(e))
            console.log(message)
        }

    }


    return (
        <>
            <div style={{ marginTop: "20vh" }}>
                <div className="container ">
                    <div
                        id="login-row"
                        className="row justify-content-center align-items-center"
                    >
                        <div id="login-column" className="col-md-6 ">
                            <div className="row justify-content-center align-items-center">
                                <div id="login-box" className="col-md-9 border border-primary rounded-top px-5 py-5" >
                                    <form id="login-form" className="form" onSubmit={login}>
                                        <h3 className="text-center text-info">Login</h3>
                                        <span id="isLogin"></span>
                                        <div className="form-group">
                                            <label htmlFor="email" className="text-info" >Email:</label><br />
                                            <input id="email" className="form-control" name="email" value={loginData.email} onChange={handleInput} />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="password" className="text-info">Password:</label
                                            ><br />
                                            <input id="password" className="form-control" name="password" value={loginData.password} onChange={handleInput} />
                                        </div>
                                        <div className="form-group">
                                            <div id="register-link" className="text-right mt-3">
                                                <p className="text-warning">
                                                    Don't have an account?
                                                    <Link to="/signup" className="text-info" style={{ textDecoration: "none" }}> Register here</Link>
                                                </p>
                                            </div>
                                            <input
                                                type="submit"
                                                id="login"
                                                className="btn btn-primary btn-md"
                                                value="Login"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}