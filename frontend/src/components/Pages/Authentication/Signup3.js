import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function saveUserData() {
    let u_data = localStorage.getItem("post")
    if (u_data) {
        return JSON.parse(u_data)
    } else {
        return []
    }
}

function SignUp(props) {

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const handledata = (fieldname, value) => {
        console.log(`~~~~~~~~~~~~`);
        // const name = e.target.name;
        // const username = e.target.username;
        // const email = e.target.email;
        // const phone = e.target.phone;
        // const password = e.target.password;

        setUser({ ...user, [fieldname]: value });
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        const newRecord = { ...user, id: new Date().getTime().toString() }
        props.setRecord([...props?.record || [], newRecord]);

        console.log(newRecord);
        console.log("this is the total record");
        console.log(props.record);

        setUser({ name: "", username: "", email: "", phone: "", password: "" })

    }

    useEffect(() => {
        localStorage.setItem('record', JSON.stringify(props.record))
    }, [props.record]);

    return (
        <div className="container  my-3 col-md-5 mx-auto">
            {/* <!-- Pills navs --> */}
            <ul className="nav nav-pills nav-justified mb-3 " id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <Link className="nav-link" id="tab-login" data-mdb-toggle="pill" to="/SignIn" role="tab"
                        aria-controls="pills-login" aria-selected="true">Login</Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link active" id="tab-register" data-mdb-toggle="pill" to="/SignUp" role="tab"
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
                            <input type="text" id="registerName" className="form-control" onChange={e => {
                                handledata('name', e.target.value);
                            }} />
                            <label className="form-label" htmlFor="registerName">Name</label>
                        </div>

                        {/* <!-- Username input --> */}
                        <div className="form-outline mb-4">
                            <input type="text" id="registerUsername" className="form-control" onChange={e => {
                                handledata('name', e.target.value);
                            }} />
                            <label className="form-label" htmlFor="registerUsername">Username</label>
                        </div>

                        {/* <!-- Email input --> */}
                        <div className="form-outline mb-4">
                            <input type="email" id="registerEmail" className="form-control" onChange={e => {
                                handledata('name', e.target.value);
                            }} />
                            <label className="form-label" htmlFor="registerEmail">Email</label>
                        </div>

                        {/* <!-- Email input --> */}
                        <div className="form-outline mb-4">
                            <input type="email" id="registerEmail" className="form-control" onChange={e => {
                                handledata('name', e.target.value);
                            }} />
                            <label className="form-label" htmlFor="registerEmail">Phone</label>
                        </div>

                        {/* <!-- Password input --> */}
                        <div className="form-outline mb-4">
                            <input type="password" id="registerPassword" className="form-control" onChange={e => {
                                handledata('name', e.target.value);
                            }} />
                            <label className="form-label" htmlFor="registerPassword">Password</label>
                        </div>

                        {/* <!-- Repeat Password input --> */}
                        {/* <div className="form-outline mb-4">
                            <input type="password" id="registerRepeatPassword" className="form-control" />
                            <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
                        </div> */}

                        {/* <!-- Checkbox --> */}
                        <div className="form-check d-flex justify-content-center mb-4">
                            <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck"
                                aria-describedby="registerCheckHelpText" />
                            <label className="form-check-label" htmlFor="registerCheck">
                                I have read and agree to the terms
                            </label>
                        </div>

                        {/* <!-- Submit button --> */}
                        <button type="submit" className="btn btn-primary btn-block mb-3" onClick={handelSubmit}>Sign in</button>
                    </form>
                </div>

            </div>
        </div>
    )
}
export default SignUp;