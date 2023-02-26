import React from 'react'

import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';//MDB css
import "@fortawesome/fontawesome-free/css/all.min.css";//MDB css

import AllRoutes from './Router/Routes';

function App() {
  return (
    <>
      <AllRoutes />
    </>
  )
}
export default App;