import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

const UploadImg = () => {
    //react hook form 
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [data, setData] = useState("");
    const onSubmit = data => console.log(data);
    // console.log(errors);

    const [username, setUsername] = useState("");
    const [filename, setFilename] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    // useEffect(() => {
    //     console.log(message)
    // }, [message]);
    const handleImgupload = async (e) => {
        e.preventDefault();
        console.warn("username,password", username, filename)
        let result = await fetch('http://localhost:4000/auth/home/updateprofile', {
            method: 'patch',
            body: JSON.stringify({ username, filename }),
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
            <div className='mt-5 pt-2'>
                <form>
                    <h1>Upload and Display Img using React Hook</h1>
                    <input type="text" className="input Box " placeholder=' Enter Username'
                        onChange={(e) => setUsername(e.target.value)} value={username} /><br /><br />
                    <br />
                    <input
                        type="file"
                        name="myImage"
                        onChange={(event) => {
                            console.log(event.target.files[0]);
                            setSelectedImage(event.target.files[0]);
                        }}
                    />
                    {selectedImage && (
                        <div>
                            <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                            <br />
                            <button onClick={() => setSelectedImage(null)}>Remove</button>
                        </div>
                    )}
                    <br />
                    <button onClick={handleImgupload} className="uploadButton" type="button">Submit</button>
                </form>

            </div>
            {/* <div className='login'>
                <h1>Update Image</h1>
                <input type="text" className="input Box " placeholder=' Enter username'
                    onChange={(e) => setUsername(e.target.value)} value={username} /><br /><br />
                <input type="text" className="input Box " placeholder=' Enter filename'
                    onChange={(e) => setFilename(e.target.value)} value={filename} /><br /><br />
                <button onClick={handleSignin} className="appButton" type="button">Login</button>
            </div> */}
        </>
    )
}
export default UploadImg;