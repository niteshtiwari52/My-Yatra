import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import About from "./about";
import Home from "./home";
import Login from "./login";
import Register from "./register";
const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
};
export default Routing;
