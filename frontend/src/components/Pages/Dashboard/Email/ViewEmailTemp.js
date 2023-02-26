import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../UserContextProvider';
import UseStateArray from '../../../useStateArray';
//React Bootstrap Component
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function getListItem() {
    let post = localStorage.getItem("post");
    if (post) {
        return JSON.parse(post)
    } else {
        return []
    }
} 

function MyVerticallyCenteredModal(props,id,title,templateName) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{{id}}</h4>
                <h4>{{title}}</h4>
                <p>
                    {/* {{body}} */}
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


function ViewEmailTemp(props) {
    const { user } = useContext(UserContext)
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [templateName, setTemplateName] = useState([]);
    // const [note, setNote] = useState(getListItem());
    // const [todoList, setTodoList] = useState([]);

    const [modalShow, setModalShow] = React.useState(false);

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
    const savedNotes = () => {
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
        (async () => {
            console.log("working")
            const result = await fetch("http://localhost:4000/auth/home/emailtemp/view", {
                method: 'get',
                headers: {
                    'content-type': 'application/json'
                }
            });
            const emaildata = await result.json();
            console.log(emaildata)
            if (result) {
                setTemplateName(emaildata);
            }
        })();
    }, [])
    //For Delete Data
    const handleDelete = async (id) => {
        // e.preventDefault();
        let username = user.name
        console.log("username,id", username, id)
        let result = await fetch('http://localhost:4000/auth/home/emailtemp/delete', {
            method: 'post',
            body: JSON.stringify({ username, id }),
            headers: {
                'content-type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if (result) {
            alert("Successfully deleted");
        } else {
            alert("User Is not Authorised to Delete");
        }
    }
    //For Edit But I'LL not Do
    const handleEdit = (id) => {
        let data = note.find(ele => {
            return ele.id === id
        })
        setName(data.name);
        setText(data.body);
    }

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
                <button className="btn btn-primary mx-2 active" role="button" data-bs-toggle="button" aria-pressed="true" onClick={saveNotes}>
                    New Templates</button>
                <button component={Link} to="/dbfgxdfb" className="btn btn-success my-2" role="button" data-bs-toggle="button" onClick={savedNotes} >
                    Saved Templates</button>

                {/* <Button variant="primary" onClick={() => setModalShow(true)}>
                    Launch vertically centered modal
                </Button>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                /> */}

                <div className="form-group">
                    <h1>Your Saved Email Templates</h1>
                </div>
                <div>
                    <div className="row">
                        {templateName.map((e) => {
                            return (
                                <div className="col-sm-12 mt-3 " key={e.id}>
                                    <div className="card bg-warning bg-opacity-25 text-dark">
                                        <div className="card-body">
                                            <h5 className="card-title">{e.templatename}</h5>
                                            <p className="card-text">{e.title}</p>
                                            <button className="btn btn-success " onClick={() => setModalShow(true,e.id,e.title,e.templateName)}>View</button>
                                            <button className="btn btn-danger mx-2" onClick={() => handleDelete(e.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* <div>
                    <h1>Your saved Templates</h1>
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
                </div> */}
                {/* <UseStateArray /> */}
                {/* <UseStateArray data={myArray} clearArray={clearArray} removeElm={removeElm} /> */}
            </div>
        </>
    )
}
export default ViewEmailTemp;