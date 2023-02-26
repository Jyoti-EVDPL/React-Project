import React, { useState, useEffect } from 'react';
import UseStateArray from '../../useStateArray';
import axios from 'axios';

//axios methods-------------------
// axios.get(' http://localhost:3000/')
//     .then(function (response) {
//         // handle success
//         console.log(response);
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     })
//     .finally(function () {
//         // always executed
//     });

//postman------------------------------------
// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//     "username": "Sonya82",
//     "password": "admin123"
// });

// var requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
// };

// fetch("localhost:4000/auth/login", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));

const fetchData = async()=>{
    // const{data}=await axios.get("https://api.twitter.com/")
    const{data}=await axios.get('/auth/login');
    console.log(data)
}

function getListItem() {
    let post = localStorage.getItem("post");
    if (post) {
        return JSON.parse(post)
    } else {
        return []
    }
}

function Api(props) {
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [note, setNote] = useState(getListItem());
    // const [todoList, setTodoList] = useState([]);

    const saveNotes = () => {
        if ((name === "" || text === "")) {
            alert("Please fill All the fields");
        }
        else {
            const post = { id: Math.floor(Math.random() * 1000 + 1), name: name, body: text };
            setNote([...note, post]);
            clearText();
            // let posts = localStorage.getItem('post');
            // setTodoList(posts);
        }
    };

    useEffect(() => {
        localStorage.setItem("post", JSON.stringify(note))
    }, [note])

    const clearText = () => {
        setText("");
        setName("");
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
                <div className="form-group">
                    <h1>Record Your Notes Here</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Note Title</label>
                        <input type="text" className="form-control" id="_title" placeholder=""
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea className="form-control" id="_body" rows="7"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <button className="btn btn-success my-2" role="button" data-bs-toggle="button" onClick={saveNotes} >
                    Submit</button>
                <button className="btn btn-primary mx-2 active" role="button" data-bs-toggle="button" aria-pressed="true" onClick={clearText}>
                    Clear</button>
                <button className="btn btn-primary mx-2 active" role="button" data-bs-toggle="button" aria-pressed="true" onClick={fetchData}>
                    FetchApi</button>
                <div className="container">
                    <h3>Summary</h3>
                    {/* <p>Words: {text.split(" ").length} and Characters: {text.length}</p> */}
                </div>
                <div>
                    <h1>Your saved note</h1>
                    <div>
                        {note.map((curNote) => {
                            return (
                                <h6 className="h1style" key={curNote.id}>Name:
                                    {curNote.name}Age: {curNote.body}
                                </h6>
                            );
                        })
                        }
                    </div>
                </div>
                {/* <UseStateArray /> */}
                {/* <UseStateArray data={myArray} clearArray={clearArray} removeElm={removeElm} /> */}
            </div>
        </>
    )
}
export default Api;