import React, { useState } from 'react'

const UseStateArray = ({ data }) => {
    const myBioData = [
        {
            id: 0, myName: "Jyoti", age: 23
        },
        {
            id: 1, myName: "Shankar", age: 25
        },
        {
            id: 2, myName: "Panda", age: 22
        }
    ]
    const [myArray, setmyArray] = useState(myBioData);



    const clearArray = () => {
        setmyArray([]);
    }
    const removeElm = (id) => {
        const myNewData = myArray.filter((curElm) => {
            return curElm.id != id;
        })
        setmyArray(myNewData);
    }
    return (
        <>
            {
                data.map((curElm) => {
                    return (
                        <h3 className="h1style" key={curElm.id}>Name:
                            {curElm.myName} & Age: {curElm.age}
                            <button className="ghdf" onClick={() =>
                                removeElm(curElm.id)}>remove</button>
                        </h3>
                    );
                })
            }
            <button className='btn' onClick={clearArray}>Clear</button>
        </>
    )
}
export default UseStateArray;