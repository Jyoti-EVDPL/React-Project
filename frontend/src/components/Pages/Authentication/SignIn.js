import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignIn(props) {
    //for re-signin restriction
    const Navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('token');
        if (auth) {
            alert('User Already LoggedIn')
            Navigate("/")
        }
    })

    const [message, setMessage] = useState("")
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })
    useEffect(() => {
        console.log(message)
    }, [message]);
    const handleInput = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value })
    }
    const clearText = () => {
        loginData.username("");
        loginData.password("");
    };
    const login = (e) => {
        e.preventDefault();
        if (loginData.username === "" || loginData.password === "") {
            alert("Please Fill all data")
        } else {

            const options = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            }
            fetch("http://localhost:4000/auth/login", options)
                .then((res) => res.text())
                .then((data) => setMessage(data)).catch(e => console.log(e))
                .catch(error => console.log('error', error));
            console.log(message)
        }

    }
    //----------------------------------------------------------------
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // const raw = JSON.stringify({
    //     "username": username,
    //     "password": password
    // });
    // const requestOptions = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    // };
    // fetch("localhost:4000/auth/login", requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));
    //------------------------------------------------------------------------------

    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const handleSignin = async (e) => {
    //     e.preventDefault();
    //     console.log(username, password)
    //     let result = await fetch('http://localhost:4000/auth/login', {
    //         method: 'post',
    //         body: JSON.stringify(username, password),
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     });
    //     result = await result.json();// as it return promise to we use await
    //     console.log(result)
    // }

    return (
        // <div container my-3 col-md-5 mx-auto>
        //     <div className="container  my-3 col-md-5 mx-auto">
        //         {/* <!-- Pills navs --> */}
        //         <ul className="nav nav-pills nav-justified mb-3 " id="ex1" role="tablist">
        //             <li className="nav-item" role="presentation">
        //                 <Link className="nav-link active" id="tab-login" data-mdb-toggle="pill" to="/SignIn" role="tab"
        //                     aria-controls="pills-login" aria-selected="true">Login</Link>
        //             </li>
        //             <li className="nav-item" role="presentation">
        //                 <Link className="nav-link" id="tab-register" data-mdb-toggle="pill" to="/SignUp" role="tab"
        //                     aria-controls="pills-register" aria-selected="false">Register</Link>
        //             </li>
        //         </ul>
        //         {/* <!-- Pills content --> */}
        //         <div className="tab-content">
        //             <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
        //                 <form>
        //                     <div className="text-center mb-3">
        //                         <p>Sign in with:</p>
        //                         <button type="button" className="btn btn-link btn-floating mx-1">
        //                             <i className="fab fa-facebook-f"></i>
        //                         </button>

        //                         <button type="button" className="btn btn-link btn-floating mx-1">
        //                             <i className="fab fa-google"></i>
        //                         </button>

        //                         <button type="button" className="btn btn-link btn-floating mx-1">
        //                             <i className="fab fa-twitter"></i>
        //                         </button>

        //                         <button type="button" className="btn btn-link btn-floating mx-1">
        //                             <i className="fab fa-github"></i>
        //                         </button>
        //                     </div>

        //                     <p className="text-center">or:</p>

        //                     {/* <!-- Username input(2) --> */}
        //                     <div className="form-outline mb-4">
        //                         <input type="text" id="loginName" className="form-control"
        //                             onChange={(e) => setUsername(e.target.value)} value={username} />
        //                         <label className="form-label" htmlFor="loginName">Email or username</label>
        //                     </div>

        //                     {/* <!-- Password input(2) --> */}
        //                     <div className="form-outline mb-4">
        //                         <input type="password" id="loginPassword" className="form-control"
        //                             onChange={(e) => setPassword(e.target.value)} value={password} />
        //                         <label className="form-label" htmlFor="loginPassword">Password</label>
        //                     </div>

        //                     {/* <!-- 2 column grid layout --> */}
        //                     <div className="row mb-4">
        //                         <div className="col-md-6 d-flex justify-content-center">
        //                             {/* <!-- Checkbox --> */}
        //                             <div className="form-check mb-3 mb-md-0">
        //                                 <input className="form-check-input" type="checkbox" value="" id="loginCheck" />
        //                                 <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
        //                             </div>
        //                         </div>

        //                         <div className="col-md-6 d-flex justify-content-center">
        //                             {/* <!-- Simple link --> */}
        //                             <a href="#!">Forgot password?</a>
        //                         </div>
        //                     </div>

        //                     {/* <!-- Submit button --> */}
        //                     <button onClick={handleSignin} type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

        //                     {/* <!-- Register buttons --> */}
        //                     <div className="text-center">
        //                         <p>Not a member? <Link to="/SignUp">Register</Link></p>
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </div>



        // <div container="true" my-3="true" col-md-5="true" mx-auto="true">
        <div className="container  my-3 col-md-5 mx-auto">
            {/* <!-- Pills navs --> */}
            <ul className="nav nav-pills nav-justified mb-3 " id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <Link className="nav-link active" id="tab-login" data-mdb-toggle="pill" to="/auth/SignIn" role="tab"
                        aria-controls="pills-login" aria-selected="true">Login</Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link" id="tab-register" data-mdb-toggle="pill" to="/auth/SignUp" role="tab"
                        aria-controls="pills-register" aria-selected="false">Register</Link>
                </li>
            </ul>
            {/* <!-- Pills content --> */}
            <div className="tab-content">
                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <form>
                        <div className="text-center mb-3">
                            <p>Sign in with:</p>
                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-facebook-f"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-google"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-twitter"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-github"></i>
                            </button>
                        </div>

                        <p className="text-center">or:</p>

                        {/* <!-- UserName input --> */}
                        <div className="form-outline mb-4">
                            <input type="text" id="username" className="form-control"
                                name="username" value={loginData.username} onChange={handleInput} />
                            <label className="form-label" htmlFor="username">Email or username</label>
                        </div>

                        {/* <!-- Password input --> */}
                        <div className="form-outline mb-4">
                            <input type="password" id="password" className="form-control" autoComplete="on"
                                name="password" value={loginData.password} onChange={handleInput} />
                            <label className="form-label" htmlFor="password">Password</label>
                        </div>

                        {/* <!-- Username input(2) --> */}
                        {/* <div className="form-outline mb-4">
                            <input type="text" id="loginName" className="form-control"
                                onChange={(e) => setUsername(e.target.value)} value={username} />
                            <label className="form-label" htmlFor="loginName">Email or username</label>
                        </div> */}

                        {/* <!-- Password input(2) --> */}
                        {/* <div className="form-outline mb-4">
                            <input type="password" id="loginPassword" className="form-control"
                                onChange={(e) => setPassword(e.target.value)} value={password} />
                            <label className="form-label" htmlFor="loginPassword">Password</label>
                        </div> */}

                        {/* <div className="form-group">
                                <label htmlFor="username" className="text-info" >username</label><br />
                                <input id="username" className="form-control" name="username" value={loginData.username} onChange={handleInput} />
                            </div> */}
                        {/* <div className="form-group mt-3">
                                <label htmlFor="password" className="text-info">Password:</label
                                ><br />
                                <input id="password" className="form-control" name="password" value={loginData.password} onChange={handleInput} />
                            </div> */}

                        {/* <!-- 2 column grid layout --> */}
                        <div className="row mb-4">
                            <div className="col-md-6 d-flex justify-content-center">
                                {/* <!-- Checkbox --> */}
                                <div className="form-check mb-3 mb-md-0">
                                    <input className="form-check-input" type="checkbox" value="" id="loginCheck" />
                                    <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
                                </div>
                            </div>

                            <div className="col-md-6 d-flex justify-content-center">
                                {/* <!-- Simple link --> */}
                                <Link to="/auth/ForgotPassword">Forgot password?</Link>
                            </div>
                        </div>

                        {/* <!-- Submit button --> */}
                        <button onClick={login} type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                        {/* <!-- Submit button(2) --> */}
                        {/* <button onClick={handleSignin} type="submit" className="btn btn-primary btn-block mb-4">Sign in</button> */}


                        {/* <!-- Register buttons --> */}
                        <div className="text-center">
                            <p>Not a member? <Link to="/auth/SignUp">Register</Link></p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
        // </div>
    )
}
export default SignIn;