import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../UserContextProvider';
import UseStateArray from '../../../../useStateArray';
// import SweetAlert from 'react-bootstrap-sweetalert';
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


function RoleView(props) {
    const Navigate = useNavigate();
    const { user } = useContext(UserContext)
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [roleName, setRoleName] = useState([]);
    const [claims, setClaims] = useState(['blog_view', 'blog_edit', 'blog_add', 'blog_delete'])
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
            const result = await fetch("http://localhost:4000/auth/home/admin/view_roles", {
                method: 'get',
                headers: {
                    'content-type': 'application/json'
                }
            });
            const roledata = await result.json();
            console.log(roledata)
            if (result) {
                setRoleName(roledata);
            }
        })();
    }, [])
    //For Delete Data
    const handleDelete = async (role_id) => {
        // e.preventDefault();
        // let username = user.name
        let username = "admin123";
        console.log("username,config_id", username, role_id)
        let result = await fetch('http://localhost:4000/auth/home/admin/delete_roles', {
            method: 'post',
            body: JSON.stringify({ username, role_id }),
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
            <div className="container pt-5">
                <table className="table mt-5 pt-5">
                    <thead>
                        <h6 className='text-primary'>Saved Roles</h6>
                        <tr>
                            <th>Role_ID</th>
                            <th>Role_Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {roleName.map((e) => {
                        return (
                            <tbody role_id={e.role_id}>
                                <tr>
                                    <td>{e.role_id}</td>
                                    <td>{e.role_name}</td>
                                    <td>{e.role_desc}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary mx-2" onClick={() => {
                                            Navigate(`/Admin/Roles/Edit/${e.role_id}`,
                                                { state: { role_id: e.role_id, role_name: e.role_name, role_desc: e.role_desc, role_isactive: e.role_isactive, claim: claims } })
                                        }}>Edit</button>
                                        <button type="button" className="btn btn-sm btn-danger" data-toggle="modal" data-target="#deleteModal" onClick={() => handleDelete(e.role_id)}
                                        >Delete</button>
                                    </td>
                                </tr>
                                {/* <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                            <td>
                                <Link to="#" className="btn btn-sm btn-primary">Edit</Link>
                                <button type="button" className="btn btn-sm btn-danger" data-toggle="modal" data-target="#deleteModal">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jane Smith</td>
                            <td>janesmith@example.com</td>
                            <td>
                                <Link to="#" className="btn btn-sm btn-primary">Edit</Link>
                                <button type="button" className="btn btn-sm btn-danger" data-toggle="modal" data-target="#deleteModal">Delete</button>
                            </td>
                        </tr> */}
                                {/* <!-- more rows here --> */}
                            </tbody>
                        );
                    })}
                </table>
                {/* <!-- Add New Role --> */}
                <Link to="/Admin/Roles/Add"><button className="btn btn-primary mx-2 active my-3" role="button" aria-pressed="true" >Add Roles</button>
                </Link>
                {/* <!-- Delete modal --> */}
                <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteModalLabel">Delete User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this user?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container mt-5 pt-5">
                {/* <Button variant="primary" onClick={() => setModalShow(true)}>
                    Launch vertically centered modal
                </Button>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                /> */}
                <div className="form-group">
                    <h1 className='text-primary'>Your Saved Roles</h1>
                </div>
                <div>
                    <div className="row">
                        {roleName.map((e) => {
                            return (
                                <div className="col-sm-12 mt-3 " role_id={e.role_id}>
                                    <div className="card bg-warning bg-opacity-25 text-dark">
                                        <div className="card-body">
                                            <h5 className="card-title">{e.role_name}</h5>
                                            <p className="card-text">{e.role_desc}</p>
                                            {/* <button className="btn btn-success " onClick={() => setModalShow(true, e.role_id, e.title, e.templateName)}>View</button> */}
                                            <button className="btn btn-success " onClick={() => { Navigate(`/Admin/Roles/Edit/${e.role_id}`, { state: { role_id: e.role_id, role_name: e.role_name, role_desc: e.role_desc, role_isactive: e.role_isactive, claim: claims } }) }}>Edit</button>
                                            <button className="btn btn-danger mx-2" onClick={() => handleDelete(e.role_id)}>Delete</button>
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
                    <Link to="/Admin/Roles/Add2"><button className="btn btn-primary mx-2 active my-3" role="button" aria-pressed="true" >Add Role 2</button>
                        {/* <button className="btn btn-primary mx-2 active my-3" role="button" data-bs-toggle="button" aria-pressed="true">Add Configuration</button> */}
                    </Link></div>
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
export default RoleView;