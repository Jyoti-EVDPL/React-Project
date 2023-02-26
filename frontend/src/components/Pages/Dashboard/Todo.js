import React, { useState, useEffect } from 'react';
import UseStateArray from '../../useStateArray';

function getListItem() {
    let post = localStorage.getItem("post");
    if (post) {
        return JSON.parse(post)
    } else {
        return []
    }
}

function Todo(props) {
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
export default Todo;