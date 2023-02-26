import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../UserContextProvider';
import UseStateArray from '../../../useStateArray';
// import SweetAlert from 'react-bootstrap-sweetalert';
//React Bootstrap Component
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PermissionCheck from '../../Authentication/PermissionCheck';

function getListItem() {
    let post = localStorage.getItem("post");
    if (post) {
        return JSON.parse(post)
    } else {
        return []
    }
}
//MDB react popup msg
// function MyVerticallyCenteredModal(props,id,title,templateName) {
//     return (
//         <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     Modal heading
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <h4>{{id}}</h4>
//                 <h4>{{title}}</h4>
//                 <p>
//                     {/* {{body}} */}
//                     Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//                     dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//                     consectetur ac, vestibulum at eros.
//                 </p>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button onClick={props.onHide}>Close</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }


function ConfigurationView(props) {
    const Navigate = useNavigate();
    const { user } = useContext(UserContext)
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [configName, setConfigName] = useState([]);
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
            // console.log("working")//--------------------------------------------------------FOR TESTING ONLY
            const result = await fetch("http://localhost:4000/auth/home/config/view", {
                method: 'get',
                headers: {
                    'content-type': 'application/json'
                }
            });
            const configdata = await result.json();
            // console.log(configdata)//--------------------------------------------------------FOR TESTING ONLY
            if (result) {
                setConfigName(configdata);
            }
        })();
    }, [])
    //For Delete Data
    const handleDelete = async (config_id) => {
        // e.preventDefault();
        let username = user.name
        console.log("username,config_id", username, config_id)
        let result = await fetch('http://localhost:4000/auth/home/config/delete', {
            method: 'post',
            body: JSON.stringify({ username, config_id }),
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

    const Redirect = (id) => {
        let data = note.find(ele => {
            return ele.id === id
        })
        setName(data.name);
        setText(data.body);
    }

    const handleEdit1 = async (config_id) => {
        Navigate(`/Config/Edit/${config_id}`, { state: { id: 1, name: 'sabaoon' } });
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
            <div className="container mt-5 pt-5">


                {/* <Button variant="primary" onClick={() => setModalShow(true)}>
                    Launch vertically centered modal
                </Button>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                /> */}

                <div className="form-group">
                    <h1>Your Saved Configuration</h1>
                </div>
                <div>
                    <div className="row">
                        {configName.map((e) => {
                            return (
                                <div className="col-sm-12 mt-3 " config_id={e.config_id}>
                                    <div className="card bg-warning bg-opacity-25 text-dark">
                                        <div className="card-body">
                                            <h5 className="card-title">{e.configname}</h5>
                                            <p className="card-text">{e.title}</p>
                                            {/* <button className="btn btn-success " onClick={() => setModalShow(true, e.config_id, e.title, e.templateName)}>View</button> */}
                                            <PermissionCheck claim="configuration_edit">
                                                <button className="btn btn-success " onClick={() => { Navigate(`/Config/Edit/${e.config_id}`, { state: { config_id: e.config_id, name: e.configname, title: e.title, description: e.description } }) }}>Edit</button>
                                            </PermissionCheck>
                                            <PermissionCheck claim="configuration_delete">
                                                <button className="btn btn-danger mx-2" onClick={() => handleDelete(e.config_id)}>Delete</button>
                                            </PermissionCheck>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* <SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes, delete it!"
                        confirmBtnBsStyle="danger"
                        title="Are you sure?"
                        onConfirm={setDelete}
                        onCancel={this.onCancel}
                        focusCancelBtn
                    >
                    <button className="btn btn-danger mx-2" onClick={() => handleDelete(e.id)}>Delete 1</button>
                        You will not be able to recover this imaginary file!
                    </SweetAlert> */}
                </div>
                <div >
                    <PermissionCheck claim="emailtemplate_add">
                        <Link to="/Config/Add"><button className="btn btn-primary mx-2 active my-3" role="button" aria-pressed="true" >Add Configuration</button>
                            {/* <button className="btn btn-primary mx-2 active my-3" role="button" data-bs-toggle="button" aria-pressed="true">Add Configuration</button> */}
                        </Link>
                    </PermissionCheck>
                </div>
                {/* <button component={Link} to="/dbfgxdfb" className="btn btn-success my-2" role="button" data-bs-toggle="button" onClick={savedNotes} >
                    Saved Templates</button> */}
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
export default ConfigurationView;