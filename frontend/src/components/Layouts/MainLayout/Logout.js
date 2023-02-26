import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Logout = () => {
    //react hook form 
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [data, setData] = useState("");
    const onSubmit = data => console.log(data);
    console.log(errors);

    const [fullname, setFullName] = useState("");
    const [emailid, setEmailid] = useState("");
    const [phnumber, setPhnumber] = useState("");
    const [DOB, setDOB] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    // useEffect(() => {
    //     console.log(message)
    // }, [message]);
    const handleSignin = async (e) => {
        e.preventDefault();
        console.warn("username,password", fullname,emailid,phnumber,DOB,country,state,city,pincode)
        let result = await fetch('http://localhost:4000/auth/home/updateprofile', {
            method: 'patch',
            body: JSON.stringify({ fullname,emailid,phnumber,DOB,country,state,city,pincode }),
            headers: {
                'content-type': 'application/json'
            }
        })
        // .then((res) => res.text())
        // .then((data) => setMessage(data)).catch(e => console.log(e))
        // .catch(error => console.log('error', error));
        result = await result.json();// as it return promise to we use await
        console.warn(result)
        // console.log(data)
        // console.log(message)
    }
    return (
        <>
            <div className='login'>
                <h1>Logout</h1>
                <input type="text" className="input Box " placeholder=' Enter Fullname'
                    onChange={(e) => setFullName(e.target.value)} value={fullname} /><br /><br />
                <input type="text" className="input Box " placeholder=' Enter Emailid'
                    onChange={(e) => setEmailid(e.target.value)} value={emailid} /><br /><br />
                <input type="text" className="input Box " placeholder=' Enter Phnumber'
                    onChange={(e) => setPhnumber(e.target.value)} value={phnumber} /><br /><br />
                <input type="text" className="input Box " placeholder=' Enter DOB'
                    onChange={(e) => setDOB(e.target.value)} value={DOB} /><br /><br />
                <input type="text" className="input Box " placeholder=' Enter Country'
                    onChange={(e) => setCountry(e.target.value)} value={country} /><br /><br />
                <input type="text" className="input Box " placeholder=' Enter State'
                    onChange={(e) => setState(e.target.value)} value={state} /><br /><br />
                <input type="text" className="input Box " placeholder=' Enter City'
                    onChange={(e) => setCity(e.target.value)} value={city} /><br /><br />
                <input type="text" className="input Box " placeholder=' Enter Pincode'
                    onChange={(e) => setPincode(e.target.value)} value={pincode} /><br /><br />
                <button onClick={handleSignin} className="appButton" type="button">Login</button>
            </div>
        </>
    )
}
export default Logout;