import React, { useState, useEffect } from 'react';
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';

export default function HomePage() {
  // const [lat, setLat] = useState(null);
  // const [long, setLong] = useState(null);
  // const [error, setError] = useState(null);
  // const [rsdata, setRsdata] = useState();

  // useEffect(() => {
  //   fetch('https://extreme-ip-lookup.com/json/?key=6CScVQ07KPz2qmLqoNu7')
  //     .then(res => res.json())
  //     .then(response => {
  //       console.log("Country is : ", response.country);
  //       console.log(response);
  //       setRsdata(response)
  //     })
  //     .catch((data, status) => {
  //       console.log('Request failed:', data);
  //     });
  //   // if (response) {
  //   //   let result = fetch('http://localhost:4000/auth/locationData', {
  //   //     method: 'post',
  //   //     body: JSON.stringify({ rsdata }),
  //   //     headers: {
  //   //       'content-type': 'application/json'
  //   //     }

  //   //   })
  //   // }
  //   // console.log("data")
  //   // console.log(result.status)
  // }, [])


  // const geolocationAPI = navigator.geolocation;
  // const getUserCoordinates = () => {
  //   if (!geolocationAPI) {
  //     setError('Geolocation API is not available in your browser!')
  //     console.log(error)
  //   } else {
  //     geolocationAPI.getCurrentPosition((position) => {
  //       const { coords } = position;
  //       setLat(coords.latitude);
  //       setLong(coords.longitude);
  //       console.log(lat, long);
  //       alert("latitude:" + lat + "     " + "Longitude:" + long);
  //     }, (error) => {
  //       setError('Something went wrong getting your position!')
  //       alert(error.message);
  //       console.log(error.message)
  //     })
  //   }
  // }
  return (
    <>
      <MDBCarousel showIndicators showControls fade className='mt-5 pt-3'>
        <MDBCarouselItem
          className='w-100 d-block'
          itemId={1}
          src='https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg'
          alt='...'
        >
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </MDBCarouselItem>

        <MDBCarouselItem
          className='w-100 d-block'
          itemId={2}
          src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg'
          alt='...'
        >
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </MDBCarouselItem>

        <MDBCarouselItem
          className='w-100 d-block'
          itemId={3}
          src='https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg'
          alt='...'
        >
          <h5>Third slide label</h5>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </MDBCarouselItem>
      </MDBCarousel>
      {/* <div>
        <button className='btn btn-success mt-4' onClick={getUserCoordinates}>Get User Location</button>
        <button className='btn btn-primary mt-4 mx-4' onClick={getUserCoordinates}>Get User Exact Location</button>
      </div> */}
    </>
  );
}