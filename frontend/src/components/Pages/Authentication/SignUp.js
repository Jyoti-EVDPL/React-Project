import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResirect } from 'react-router-dom';

function saveUserData() {
    let u_data = localStorage.getItem("post")
    if (u_data) {
        return JSON.parse(u_data)
    } else {
        return []
    }
}

function SignUp(props) {
    //for re-signup restriction
    const Navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('token');
        if (auth) {
            alert('User Already LoggedIn')
            Navigate("/")
        }
    })

    const [message, setMessage] = useState("")
    const [signupData, setsignupData] = useState({
        fullname: "",
        username: "",
        emailid: "",
        phnumber: "",
        password: "",
        cnfpassword: "",
    })
    // const Redirect = useResirect();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setsignupData({ ...signupData, [name]: value })
    }
    const register = (e) => {
        e.preventDefault();
        if (signupData.fullname === "" || signupData.username === "" || signupData.emailid === "" ||
            signupData.phnumber === "" || signupData.password === "" || signupData.cnfpassword === "") {
            alert("Please Fill all fields")
        }
        else {
            console.log(signupData)
            const options = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
            }
            fetch("http://localhost:4000/auth/signup", options)
                .then((res) => setMessage(res)).catch(e => console.log(e))
                .then((res) => res.text())
                // .then((data) => setMessage(data)).catch(e => console.log(e))
                .catch(error => console.log('error', error));
            console.log(message)
            if (message) {
                Redirect('/DemoSignin')
            }
        }

    }


    // const [user, setUser] = useState({
    //     name: "",
    //     username: "",
    //     email: "",
    //     phone: "",
    //     password: ""
    // });

    // const handledata = (e) => {
    //     console.log(`~~~~~~~~~~~~`);
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     const username = e.target.username;
    //     const email = e.target.email;
    //     const phone = e.target.phone;
    //     const password = e.target.password;

    //     setUser({ ...user, [name]: value });
    // }

    // const handelSubmit = (e) => {
    //     e.preventDefault();
    //     const newRecord = { ...user, id: new Date().getTime().toString() }
    //     console.log(props.record);
    //     [...(props && props.record || []), newRecord]
    //     props.setRecord([...props?.record || [], newRecord]);
    //     console.log(newRecord);
    //     console.log("total record");
    //     console.log(props.record);

    //     setUser({ name: "", username: "", email: "", phone: "", password: "" })

    // }

    // useEffect(() => {
    //     localStorage.setItem('record', JSON.stringify(props.record))
    // }, [props.record]);

    return (
        <div className="container  my-3 col-md-5 mx-auto">
            {/* <!-- Pills navs --> */}
            <ul className="nav nav-pills nav-justified mb-3 " id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <Link className="nav-link" id="tab-login" data-mdb-toggle="pill" to="/auth/SignIn" role="tab"
                        aria-controls="pills-login" aria-selected="true">Login</Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link active" id="tab-register" data-mdb-toggle="pill" to="/auth/SignUp" role="tab"
                        aria-controls="pills-register" aria-selected="false">Register</Link>
                </li>
            </ul>
            {/* <!-- Pills content --> */}
            <div className="tab-content">
                <div className="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                    <form>
                        <div className="text-center mb-3">
                            <p>Sign up with:</p>
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

                        {/* <!-- Name input --> */}
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="registerName">FullName</label>
                            <input type="text" value={signupData.fullname} id="registerName" className="form-control" onChange={handleInput} name="fullname" />
                        </div>

                        {/* <!-- Username input --> */}
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="registerUsername">Username</label>
                            <input type="text" value={signupData.username} id="registerUsername" className="form-control" onChange={handleInput} name="username" />
                        </div>

                        {/* <!-- Email input --> */}
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="registerEmail">Email</label>
                            <input type="email" value={signupData.emailid} id="registerEmail" className="form-control" onChange={handleInput} name="emailid" />
                        </div>

                        {/* <!-- Email input --> */}
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="registerPhone">Phone</label>
                            <input type="number" value={signupData.phnumber} id="registerPhone" className="form-control" onChange={handleInput} name="phnumber" />
                        </div>

                        {/* <!-- Password input --> */}
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="registerPassword">Password</label>
                            <input type="password" value={signupData.password} id="registerPassword" className="form-control" onChange={handleInput} name="password" autoComplete="on" />
                        </div>

                        {/* <!-- Repeat Password input --> */}
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
                            <input type="password" value={signupData.cnfpassword} id="registerRepeatPassword" className="form-control" onChange={handleInput} name="cnfpassword" autoComplete="on" />
                        </div>

                        {/* <!-- Checkbox --> */}
                        <div className="form-check d-flex justify-content-center mb-4">
                            <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck"
                                aria-describedby="registerCheckHelpText" />
                            <label className="form-check-label" htmlFor="registerCheck">
                                I have read and agree to the terms
                            </label>
                        </div>

                        {/* <!-- Submit button --> */}
                        <button type="submit" className="btn btn-primary btn-block mb-3" onClick={register}>Sign Up</button>
                    </form>
                </div>

            </div>
        </div>
    )
}
export default SignUp;