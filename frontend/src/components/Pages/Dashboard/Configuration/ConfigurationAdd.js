import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ConfigurationAdd(props) {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [note, setNote] = useState();
    // const [todoList, setTodoList] = useState([]);
    const navigate = useNavigate();

    const saveNotes = async (e) => {
        if ((name === "" || title === "" || description === "")) {
            alert("Please fill All the fields");
            console.log(description)
        } else {
            e.preventDefault();
            console.warn("name,title, description", name, title, description)
            let result = await fetch('http://localhost:4000/auth/home/config/add', {
                method: 'post',
                body: JSON.stringify({ name, title, description }),
                headers: {
                    'content-type': 'application/json'
                }
            })
            result = await result.json();
            console.log(result)
            if (result) {
                alert(result.message)
                navigate('/Config/View')
            // } else if (result.signin_data.logintoken != null) {//for single data no need to stringfy it
            //     console.log("HEllo")
            //     setUserLogin({ logintoken: result.signin_data.logintoken, isLoggedIn: true, name: 'admin111' })
            //     // localStorage.setItem('logintoken', JSON.stringify(result.signin_data.logintoken))//some problem in localStorage
            //     localStorage.setItem('logintoken', result.signin_data.logintoken)//disabling ths due to context use
            //     navigate('/')
            } else {
                alert("user not found")
            }
        }
        // else {
        //     const post = { id: Math.floor(Math.random() * 1000 + 1), name: name, body: text };
        //     setNote([...note, post]);
        //     clearText();
        //     // let posts = localStorage.getItem('post');
        //     // setTodoList(posts);
        // }
    };
    const savedNotes = () => {
        if ((name === "" || title === "")) {
            alert("Please fill All the fields");
        }
        else {
            const post = { id: Math.floor(Math.random() * 1000 + 1), name: name, body: title };
            setNote([...note, post]);
            clearText();
            // let posts = localStorage.getItem('post');
            // setTodoList(posts);
        }
    };

    // useEffect(() => {
    //     localStorage.setItem("post", JSON.stringify(note))
    // }, [note])

    const clearText = () => {
        setName("");
        setDescription("");
    };





    // const clearArray = () => {
    //     setmyArray([]);
    // }
    // const removeElm = (id) => {
    //     const myNewData = myArray.filter((curElm) => {
    //         return curElm.id != id;
    //     })
    //     setmyArray(myNewData);
    // }

    // function lastid(arr) {
    //     return arr.at(-1).id
    // }

    return (
        <>
            <div className="container mt-5 pt-2">
                <button className="btn btn-primary mx-2 active" role="button" data-bs-toggle="button" aria-pressed="true" onClick={clearText}>
                    New Templates</button>
                <button component={Link} to="/dbfgxdfb" className="btn btn-success my-2" role="button" data-bs-toggle="button" onClick={savedNotes} >
                    Saved Templates</button>
                <div className="form-group">
                    <h1>Add New Configuration Here</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Config Name</label>
                        <input type="text" className="form-control" id="_title" placeholder=""
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                        <input type="text" className="form-control" id="_title" placeholder=""
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea className="form-control" id="_body" rows="7"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <button className="btn btn-success my-2" role="button" data-bs-toggle="button" onClick={saveNotes} >
                    Submit</button>
                <button className="btn btn-danger mx-2 active" role="button" data-bs-toggle="button" aria-pressed="true" onClick={clearText}>
                    Clear</button>
                <div className="container">
                    <h3>Summary</h3>
                    {/* <p>Words: {text.split(" ").length} and Characters: {text.length}</p> */}
                </div>
                <div>
                    <h1>Your saved note</h1>
                    <div>
                        {/* {note.map((curNote) => {
                            return (
                                <h6 className="h1style" key={curNote.id}>Name:
                                    {curNote.name}Age: {curNote.body}
                                </h6>
                            );
                        })
                        } */}
                    </div>
                </div>
                {/* <UseStateArray /> */}
                {/* <UseStateArray data={myArray} clearArray={clearArray} removeElm={removeElm} /> */}
            </div>
        </>
    )
}
export default ConfigurationAdd;