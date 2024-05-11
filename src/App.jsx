import React from "react";
import {Routes,Route} from "react-router-dom"
import Navbar from "./header/Navbar";
import About from "./header/pages/About";
import Admin from "./header/pages/Admin";



function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<About/>}/>
        <Route path='/admin' element={<Admin />}/>

      </Routes>
    </>
  )
}

export default App
