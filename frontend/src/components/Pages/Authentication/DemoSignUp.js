import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DemoSignUp = () => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [emailid, setEmailid] = useState("");
    const [phnumber, setPhnumber] = useState("");
    const [password, setPassword] = useState("");
    const [cnfpassword, setCnfpassword] = useState("");
    const navigate = useNavigate();

    const successMsg = () => {
        alert('User Registration Success')
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.warn("username,password", fullname, username, emailid, phnumber, password, cnfpassword)
        let result = await fetch('http://localhost:4000/auth/signup', {
            method: 'post',
            body: JSON.stringify({ fullname, username, emailid, phnumber, password, cnfpassword }),
            headers: {
                'content-type': 'application/json'
            }
        })
        // .then((res) => res.text())
        // .then((data) => setMessage(data)).catch(e => console.log(e))
        // .catch(error => console.log('error', error));
        result = await result.json();// as it return promise to we use await
        console.warn(result)
        if(result){
            localStorage.setItem('user', JSON.stringify(result))
            navigate('/DemoSignin')
        }
        successMsg();
        // console.log(data)
        // console.log(message)
    }
    return (
        <>
            <div className='SignUp'>
                <h1>Login</h1>
                <input type="text" className="input Box " placeholder=' Enter Fullname'
                    onChange={(e) => setFullname(e.target.value)} value={fullname} /><br></br>
                <input type="text" className="input Box " placeholder=' Enter Username'
                    onChange={(e) => setUsername(e.target.value)} value={username} /><br></br>
                <input type="text" className="input Box " placeholder=' Enter emailid'
                    onChange={(e) => setEmailid(e.target.value)} value={emailid} /><br></br>
                <input type="text" className="input Box " placeholder=' Enter phnumber'
                    onChange={(e) => setPhnumber(e.target.value)} value={phnumber} /><br></br>
                <input type="text" className="input Box " placeholder=' Enter password'
                    onChange={(e) => setPassword(e.target.value)} value={password} /><br></br>
                <input type="text" className="input Box " placeholder=' Enter cnfpassword'
                    onChange={(e) => setCnfpassword(e.target.value)} value={cnfpassword} /><br></br>
                <button onClick={handleSignUp} className="appButton" type="button">Login</button>
            </div>
        </>
    )
}
export default DemoSignUp;