import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RoleAdd2(props) {
    const [role_name, setRolename] = useState("");
    const [role_desc, setRoledesc] = useState("");
    const [role_isactive, setRoleisactive] = useState("");
    const [module_data, setModuleData] = useState([]);
    const [claim, setClaim] = useState([]);
    const [note, setNote] = useState();
    // const [todoList, setTodoList] = useState([]);
    const navigate = useNavigate();

    const [userinfo, setUserInfo] = useState({
        languages: [],
    });
    console.log(module_data)

    useEffect(() => {
        (async () => {
            console.log("working")
            const result = await fetch("http://localhost:4000/auth/home/admin/modules", {
                method: 'get',
                headers: {
                    'content-type': 'application/json'
                }
            });
            // setModuleData(roledata);

            const roledata = await result.json();
            console.log(roledata)
            if (result) {
                setModuleData(roledata);
            }
        })();
    }, [])
    //FOR CHECKING THE ACTIVITY OF CHECKBOX
    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        const { languages } = userinfo;

        console.log(`${value} is ${checked}`);

        // Case 1 : The user checks the box
        if (checked) {
            setUserInfo({
                languages: [...languages, value],
            });
        }

        // Case 2  : The user unchecks the box
        else {
            setUserInfo({
                languages: languages.filter((e) => e !== value),
            });
        }
    };


    const saveNotes = async (e) => {
        const claim = userinfo.languages;
        const data = JSON.stringify({ role_name, role_desc, role_isactive, claim })
        console.log(data)
        if ((role_name === "" || role_desc === "" || role_isactive === "")) {
            alert("Please fill All the fields");
            console.log(role_isactive)
        } else {
            e.preventDefault();
            console.warn("role_name,role_desc, role_isactive", role_name, role_desc, role_isactive, claim)
            let result = await fetch('http://localhost:4000/auth/home/admin/add_roles', {
                method: 'post',
                body: JSON.stringify({ role_name, role_desc, role_isactive, claim }),
                headers: {
                    'content-type': 'application/json'
                }
            })
            result = await result.json();
            console.log(result)
            if (result) {
                alert(result.message)
                navigate('/Admin/Roles/View')
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

    // useEffect(() => {
    //     localStorage.setItem("post", JSON.stringify(note))
    // }, [note])

    const clearText = () => {
        setName("");
        setRoleisactive("");
    };

    //CHECKBOZ JQUERY
    // $(document).ready(function () {
    //     // Check/uncheck parent checkbox based on child checkboxes
    //     $(".child-checkbox").change(function () {
    //         var all_checked = true;
    //         $(".child-checkbox").each(function () {
    //             if (!$(this).is(":checked")) {
    //                 all_checked = false;
    //             }
    //         });
    //         if (all_checked) {
    //             $("#parent-checkbox").prop("checked", true);
    //         } else {
    //             $("#parent-checkbox").prop("checked", false);
    //         }
    //     });
    // });

    // REACT CHECKBOX
    const [parentChecked, setParentChecked] = useState(false);
    const [childChecked, setChildChecked] = useState([false, false, false]);

    const handleParentChange = () => {
        setParentChecked(!parentChecked);
        setChildChecked(childChecked.map(() => !parentChecked));
    };

    const handleChildChange = (index) => {
        const updatedChildChecked = [...childChecked];
        updatedChildChecked[index] = !childChecked[index];
        setChildChecked(updatedChildChecked);

        if (updatedChildChecked.every((checked) => checked)) {
            setParentChecked(true);
        } else if (updatedChildChecked.every((checked) => !checked)) {
            setParentChecked(false);
        }
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
                    <h1>Add New Role Here</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Role Name</label>
                        <input type="text" className="form-control" id="_title" placeholder=""
                            value={role_name}
                            onChange={(e) => setRolename(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Role Description</label>
                        <textarea className="form-control" id="_body" rows="7"
                            value={role_desc}
                            onChange={(e) => setRoledesc(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" value={role_isactive} id="flexCheckDefault" onChange={(e) => setRoleisactive(e.target.checked)} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Role Active?</label>
                    </div>
                    <div className="mb-3">
                        <h6 className='text-primary'>Role Claims</h6>

                        {Object.keys(module_data).map((ele, i) => {
                            return (
                                <React.Fragment key={ele}>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value={ele} id="flexCheckDefault" onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            {/* {ele.claimName.split("_")[1]}</label> */}
                                            {ele}</label>
                                        {module_data[ele].map((ele) => {
                                            return (
                                                <div className="form-check mb-3">
                                                    <input className="form-check-input" type="checkbox" value={ele} id="flexCheckDefault" onChange={handleChange} />
                                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                        {ele.split("_")[1]}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </React.Fragment>
                            )
                        })}

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
                </div>
                <button className="btn btn-success my-2" role="button" data-bs-toggle="button" onClick={saveNotes} >
                    Submit</button>
                <button className="btn btn-danger mx-2 active" role="button" data-bs-toggle="button" aria-pressed="true" onClick={clearText}>
                    Clear</button>
            </div>
            {/* //CHECKBOX JQUERY */}
            {/* <div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input parent-checkbox" id="parent-checkbox" />
                    <label className="form-check-label" for="parent-checkbox">
                        Parent Checkbox
                    </label>
                </div>

                <div className="form-check">
                    <input type="checkbox" className="form-check-input child-checkbox" id="child-checkbox-1" />
                    <label className="form-check-label" for="child-checkbox-1">
                        Child Checkbox 1
                    </label>
                </div>

                <div className="form-check">
                    <input type="checkbox" className="form-check-input child-checkbox" id="child-checkbox-2" />
                    <label className="form-check-label" for="child-checkbox-2">
                        Child Checkbox 2
                    </label>
                </div>

                <div className="form-check">
                    <input type="checkbox" className="form-check-input child-checkbox" id="child-checkbox-3" />
                    <label className="form-check-label" for="child-checkbox-3">
                        Child Checkbox 3
                    </label>
                </div>
            </div> */}
            {/* React CHECKBOX */}
            <div className="container mt-5 pt-5">
                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" value="users_view" id="flexCheckDefault" checked={parentChecked} onChange={handleParentChange} />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Parent Checkbox</label>
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" value="users_view" id="flexCheckDefault" checked={childChecked[0]} onChange={() => handleChildChange(0)} />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Child Checkbox 1</label>
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" value="users_view" id="flexCheckDefault" checked={childChecked[1]} onChange={() => handleChildChange(1)} />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Child Checkbox 2</label>
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" value="users_view" id="flexCheckDefault" checked={childChecked[2]} onChange={() => handleChildChange(2)} />
                    <label className="form-check-label" htmlFor="flexCheckDefault">Child Checkbox 3</label>
                </div>
            </div>


            {/* other code--------------------------------------------------------------------------------- */}
            <div>
                <div className="container-fluid top ">
                    <div className="container mt-5  pb-5 pt-5">
                        <h3 className="form-head-contact-h3 ">
                            Your programming languages?{" "}
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


// const RoleAdd2 = ({ id, register, claimsData }) => {
//     const [claims, setClaims] = useState([]);
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         (async () => {
//             if (id)
//  {
//                 const res = await axios.get("http://localhost:4000/auth/home/admin/modules" + id);
//                 setClaims(res.data);
//                 const apiClaims = [];
//                 for (let index = 0; index < res.data.length; index++) {
//                     apiClaims[res.data[index].id] = claimsData.includes(res.data[index].claimName);
//                     // apiClaims.set(res.data[index].id, true);
//                 }
//                 setData(apiClaims);
//                 return;
//             }
//         })();
//         return;
//     }, [id, claimsData]);

//     function setClaimData(e, id) {
//         data[id] = e.target.checked;
//         setData([...data]);
//     }


//     return (
//         <>
//             <div>
//                 {claims && claims.map((ele, i) => {
//                     return (
//                         <React.Fragment key={ele.id}>
//                             <div className="form-check my-2">
//                                 <input className="form-check-input" checked={data[ele.id]} type="checkbox" id={`claimCheck3${ele.id}`} value={ele.id} onChange={(e) => setClaimData(e, ele.id)} />
//                                 <label htmlFor={`claimCheck3${ele.id}`} className=" form-check-label" >
//                                     {ele.claimName.split("_")[1]}
//                                 </label>
//                             </div>
//                         </React.Fragment>
//                     )
//                 })}
//             </div>
//         </>
//     )
// }
export default RoleAdd2;