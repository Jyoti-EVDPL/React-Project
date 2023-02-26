import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function RoleEdit(props) {
    const location = useLocation();
    console.log(location.state)
    const [role_id, setRoleId] = useState(location.state.role_id);
    const [role_name, setRolename] = useState(location.state.role_name);
    const [role_desc, setRoledesc] = useState(location.state.role_desc);
    const [role_isactive, setRoleisactive] = useState(location.state.role_isactive);
    const [module_data, setModuleData] = useState([]);
    const [claim, setClaim] = useState([]);
    const [claim1, setClaim1] = useState(location.state.claim);
    console.log("Claim number 1" + claim1)
    const claim3 = location.state.claim;
    console.log("Claim number 3" + claim3)
    const claim2 = ['blog_view', 'blog_edit', 'blog_add', 'blog_delete']
    const [note, setNote] = useState();
    const navigate = useNavigate();

    const [userinfo, setUserInfo] = useState({
        claimeddata: [],
    });
    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        const { claimeddata } = userinfo;

        console.log(`${value} is ${checked}`);

        // Case 1 : The user checks the box
        if (checked) {
            setUserInfo({
                claimeddata: [...claimeddata, value],
            });
        }

        // Case 2  : The user unchecks the box
        else {
            setUserInfo({
                claimeddata: claimeddata.filter((e) => e !== value),
            });
        }
    };
    const handleChange2 = (e) => {
        checked=true;
        // value = e.target.value;
        // checked = e.checked
    }

    useEffect(() => {
        (async () => {
            console.log("working")
            const result = await fetch("http://localhost:4000/auth/home/admin/modules", {
                method: 'get',
                headers: {
                    'content-type': 'application/json'
                }
            });
            const roledata = await result.json();
            console.log(roledata)
            if (result) {
                setModuleData(roledata);
            }
        })();
        (async () => {
            console.log("working")
            console.log(role_id)
            const result = await fetch("http://localhost:4000/auth/home/admin/view_claims", {
                method: 'post',
                body: JSON.stringify({ role_id }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const claimdata = await result.json();
            console.log("hyy claim" + claimdata)
            if (result) {
                setClaim(claimdata);
            }
        })();
    }, [])

    const saveNotes = async (e) => {
        const claim = userinfo.claimeddata;
        const data = JSON.stringify({ role_name, role_desc, role_isactive, claim })
        console.log(data)
        // if ((role_name === "" || role_desc === "" || role_isactive === "")) {
        //     alert("Please fill All the fields");
        //     console.log(role_isactive)
        // } else {
        //     e.preventDefault();
        //     console.warn("role_name,role_desc, role_isactive", role_name, role_desc, role_isactive, claim)
        //     let result = await fetch('http://localhost:4000/auth/home/admin/edit_roles', {
        //         method: 'post',
        //         body: JSON.stringify({ role_name, role_desc, role_isactive, claim }),
        //         headers: {
        //             'content-type': 'application/json'
        //         }
        //     })
        //     result = await result.json();
        //     console.log(result)
        //     if (result) {
        //         alert(result.message)
        //         navigate('/Admin/Roles/View')
                //         // } else if (result.signin_data.logintoken != null) {//for single data no need to stringfy it
                //         //     console.log("HEllo")
                //         //     setUserLogin({ logintoken: result.signin_data.logintoken, isLoggedIn: true, name: 'admin111' })
                //         //     // localStorage.setItem('logintoken', JSON.stringify(result.signin_data.logintoken))//some problem in localStorage
                //         //     localStorage.setItem('logintoken', result.signin_data.logintoken)//disabling ths due to context use
                //         //     navigate('/')
        //     } else {
        //         alert("user not found")
        //     }
        // }
        // else {
        //     const post = { id: Math.floor(Math.random() * 1000 + 1), name: name, body: text };
        //     setNote([...note, post]);
        //     clearText();
        //     // let posts = localStorage.getItem('post');
        //     // setTodoList(posts);
        // }
    };

    const clearText = () => {
        setName("");
        setRoleisactive("");
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
            <div className="container mt-5 pt-5">
                <button className="btn btn-primary mx-2 active" role="button" data-bs-toggle="button" aria-pressed="true" onClick={clearText}>
                    New Role</button>
                <button component={Link} to="/dbfgxdfb" className="btn btn-success my-2" role="button" data-bs-toggle="button" onClick={saveNotes} >
                    Saved Role</button>
                <div className="form-group">
                    <h1>Edit Role Here</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Role Name</label>
                        <input type="text" className="form-control" id="_title" placeholder=""
                            value={role_name}
                            onChange={(e) => setRolename(e.target.value)} />
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Role Active?</label>
                        <input type="text" className="form-control" id="_title" placeholder=""
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Role Description</label>
                        <textarea className="form-control" id="_body" rows="7"
                            value={role_desc}
                            onChange={(e) => setRoledesc(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" value={role_isactive} id="flexCheckDefault" checked={role_isactive} onChange={(e) => setRoleisactive(e.target.checked)} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Role Active?</label>
                    </div>
                    <div className="mb-3">
                        {/* <label htmlFor="exampleFormControlTextarea1" className="form-label text-primary">Role Claims</label> */}
                        {/* <label className="form-check-label" htmlFor="flexCheckDefault">
                            Role Claims
                        </label> */}
                        <h6 className='text-primary'>Role Claims</h6>
                        {Object.keys(module_data).map((ele, i) => {
                            return (
                                <React.Fragment key={ele}>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value={ele} id="flexCheckDefault"  onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            {/* {ele.claimName.split("_")[1]}</label> */}
                                            {ele}</label>
                                        {module_data[ele].map((ele) => {
                                            return (
                                                <div className="form-check mb-3">
                                                    <input className="form-check-input" type="checkbox" value={ele} id="flexCheckDefault" checked={location.state.claim.includes(ele)} onClick={handleChange2} onChange={handleChange} />
                                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                        {ele.split("_")[1]}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </React.Fragment>
                            )
                        })}

                        {/* <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" value="emailtemplate_" id="flexCheckDefault" onChange={handleChange} />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                EmailTemplate</label>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="emailtemplate_view" id="flexCheckDefault" checked={role_isactive} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    view</label>
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="emailtemplate_edit" id="flexCheckDefault" checked={role_isactive} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    edit</label>
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="emailtemplate_add" id="flexCheckDefault" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    add</label>
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="emailtemplate_delete" id="flexCheckDefault" checked={role_isactive} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    delete</label>
                            </div>
                        </div> */}
                        {/* users */}
                        {/* <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" value="users_" id="flexCheckDefault" onChange={handleChange} />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                UserList</label>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="users_view" id="flexCheckDefault" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    view</label>
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="users_edit" id="flexCheckDefault" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    edit</label>
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="users_add" id="flexCheckDefault" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    add</label>
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="users_delete" id="flexCheckDefault" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    delete</label>
                            </div>
                        </div> */}
                        {/* Configuration */}
                        {/* <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" value="configuration_" id="flexCheckDefault" onChange={handleChange} />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Configuration</label>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="configuration_view" id="flexCheckDefault" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    view</label>
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="configuration_edit" id="flexCheckDefault" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    edit</label>
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="configuration_add" id="flexCheckDefault" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    add</label>
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="configuration_delete" id="flexCheckDefault" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    delete</label>
                            </div>
                        </div> */}
                        {/* another one */}
                        {/* <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                manageuser</label>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    view</label>
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    edit</label>
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    add</label>
                            </div>

                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    delete</label>
                            </div>
                        </div> */}

                    </div>
                    <div>
                        <button className="btn" type="button" data-bs-toggle="collapse" data-bs-target="#dropmenu" aria-expanded="false">
                            <i className="fa fa-arrow-down"></i>
                        </button>
                        <div id="my-content" className="collapse">
                            {/* <!-- Content goes here --> */}
                        </div>
                    </div>
                    <div>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Select options
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" id="dropmenu">
                                <form>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="option1" />
                                        <label className="form-check-label" htmlFor="option1">
                                            Option 1
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="option2" />
                                        <label className="form-check-label" htmlFor="option2">
                                            Option 2
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="option3" />
                                        <label className="form-check-label" htmlFor="option3">
                                            Option 3
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="option4" />
                                        <label className="form-check-label" htmlFor="option4">
                                            Option 4
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
                <button className="btn btn-success my-2" role="button" data-bs-toggle="button" onClick={saveNotes} >
                    Submit</button>
                <button className="btn btn-danger mx-2 active" role="button" data-bs-toggle="button" aria-pressed="true" onClick={clearText}>
                    Clear</button>
            </div>

            {/* other code--------------------------------------------------------------------------------- */}
            <div>
                <div className="container-fluid top ">
                    <div className="container mt-5  pb-5 pt-5">
                        <h3 className="form-head-contact-h3 ">
                            Your programming expertise lies in what languages?{" "}
                        </h3>

                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-check m-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="languages"
                                            value="Javascript"
                                            id="flexCheckDefault"
                                            onChange={handleChange}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            Javascript
                                        </label>
                                    </div>
                                    <div className="form-check m-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="languages"
                                            value="Python"
                                            id="flexCheckDefault"
                                            onChange={handleChange}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            Python
                                        </label>
                                    </div>
                                    <div className="form-check m-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="languages"
                                            value="Java"
                                            id="flexCheckDefault"
                                            onChange={handleChange}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            Java
                                        </label>
                                    </div>
                                    <div className="form-check m-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="languages"
                                            value="PHP"
                                            id="flexCheckDefault"
                                            onChange={handleChange}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            PHP
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-check m-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="languages"
                                            value="C#"
                                            id="flexCheckDefault"
                                            onChange={handleChange}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            C#
                                        </label>
                                    </div>
                                    <div className="form-check m-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="languages"
                                            value="C++"
                                            id="flexCheckDefault"
                                            onChange={handleChange}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            C++
                                        </label>
                                    </div>
                                    <div className="form-check m-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="languages"
                                            value="C"
                                            id="flexCheckDefault"
                                            onChange={handleChange}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            C
                                        </label>
                                    </div>
                                    <div className="form-check m-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="languages"
                                            value="Typescript"
                                            id="flexCheckDefault"
                                            onChange={handleChange}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="flexCheckDefault"
                                        >
                                            Typescript
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-floating mt-3 mb-3 text-center">
                                <label htmlFor="exampleFormControlTextarea1">
                                    You're proficient in the following languages :{" "}
                                </label>
                                <textarea
                                    className="form-control text"
                                    name="response"
                                    value={userinfo.response}
                                    placeholder="The checkbox values will be displayed here "
                                    id="floatingTextarea2"
                                    style={{ height: "150px" }}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RoleEdit;