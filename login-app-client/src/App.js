// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList";
import EditEmployee from "./components/EditEmployee.js";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Check login status

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={isLoggedIn ? <Welcome /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
