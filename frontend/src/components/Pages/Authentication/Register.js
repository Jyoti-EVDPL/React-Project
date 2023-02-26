import React, { useState } from 'react'
import { useEffect } from 'react';

function Register(props) {
    // var newRecord = props.newRecord;
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });
    const handledata = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({ ...user, [name]: value});
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        const newRecord = { ...user, id: new Date().getTime().toString() }
        console.log(props.record)
        props.setRecord([...props?.record ||[], newRecord]);
        setUser({ username: "", email: "", phone: "", password: "" })

    }
    useEffect(() => {
        localStorage.setItem('record', JSON.stringify(props.record))
    }, [props.record]);
    return (<>
        <div className='container'>
            <div className="row d-flex justify-content-center align-items-center mt-5 h-100">
                <div className="col-3">
                    <form className="form-control" onSubmit={handelSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" value={user.username} onChange={handledata} name="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" value={user.email} onChange={handledata} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
                            <input type="text" value={user.phone} onChange={handledata} name="phone" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" value={user.password} onChange={handledata} name="password" className="form-control" id="exampleInputPassword1" />
                        </div>

                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>

            </div>
        </div>

    </>
    )
}


export default Register
