// import Carousel from 'react-bootstrap/Carousel';
// import React from 'react';

// function About() {
// return <h1>About</h1>
// return (
//   <Carousel>
//     <Carousel.Item>
//       <img
//         className="d-block w-100"
//         src="holder.js/800x400?text=First slide&bg=373940"
//         alt="First slide"
//       />
//       <Carousel.Caption>
//         <h3>First slide label</h3>
//         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//       </Carousel.Caption>
//     </Carousel.Item>
//     <Carousel.Item>
//       <img
//         className="d-block w-100"
//         src="holder.js/800x400?text=Second slide&bg=282c34"
//         alt="Second slide"
//       />

//       <Carousel.Caption>
//         <h3>Second slide label</h3>
//         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//       </Carousel.Caption>
//     </Carousel.Item>
//     <Carousel.Item>
//       <img
//         className="d-block w-100"
//         src="holder.js/800x400?text=Third slide&bg=20232a"
//         alt="Third slide"
//       />

//       <Carousel.Caption>
//         <h3>Third slide label</h3>
//         <p>
//           Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//         </p>
//       </Carousel.Caption>
//     </Carousel.Item>
//   </Carousel>
// );
// }

// export default About;

import React, { useState, useEffect } from "react";
function getListItem() {
  let post = localStorage.getItem("post");
  if (post) {
    // return JSON.parse(post)
    return JSON.parse(post)
  } else {
    return []
  }
}

export default function About(props) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState(getListItem());
  const saveNotes = () => {
    if ((name === "" || text === "")) {
      alert("Please fill the fields");
    }
    else {
      const post = { id: Math.floor(Math.random() * 10000 + 1), name: name, body: text };
      setNote([...note, post]);
      clearText();
    }
  };
  useEffect(() => {
    localStorage.setItem("post", JSON.stringify(note))
  }, [note])


  const clearText = () => {
    setText("");
    setName("");
  };
  const handleDelete = (id) => {
    const editItem = note.filter((ele) => {
      return ele.id !== id;
    })
    setNote(editItem);
  }
  const handleEdit = (id) => {
    let data = note.find(ele => {
      return ele.id === id
    })
    setName(data.name);
    setText(data.body);
  }

  return (
    <React.Fragment>
      <div className="container mt-5 pt-2">
        <div className="form-group ">
          {/* <h1>{props.Heading}</h1> */}
          <h1>Daily Notes</h1>
          <label htmlFor="_title" className="form-label">
            Title
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            id="_title"
            className={`form-control text-${props.mode === "light" ? "dark" : "light"
              } bg-${props.mode}`}
          />
          <label htmlFor="note" className="form-label my-2">
            Note
          </label>
          <textarea
            className={`form-control bg-${props.mode}`}
            id="_body"
            rows="8"
            value={text}
            // style={{ color: props.mode === "light" ? "black" : "white" }}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <button className="btn btn-success my-2" onClick={saveNotes}>
          {"Submit"}
        </button>
        <button className="btn btn-primary mx-3" onClick={clearText}>
          Clear
        </button>
        <div className="container">
          <h3>Summary</h3>
          <p>
            Words: {text.split(" ").length} and Characters: {text.length}
          </p>
        </div>
        <div>
          <h2>Notes</h2>
          <div className="row">
            {note.map((e) => {
              return (
                <div className="col-sm-4 mt-3 " key={e.id}>
                  <div className="card bg-info text-white">
                    <div className="card-body">
                      <h5 className="card-title">{e.name}</h5>
                      <p className="card-text">{e.body}</p>
                      <button className="btn btn-success " onClick={() => handleEdit(e.id)}>Edit</button>
                      <button className="btn btn-danger mx-2" onClick={() => handleDelete(e.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
