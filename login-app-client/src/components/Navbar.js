// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    // Get the logged-in employee's username from local storage
    const employeeName = localStorage.getItem("username") || "Guest";

    // Function to format username (capitalize first letter)
    const formatUsername = (name) => {
        if (!name) return "Guest";
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username"); // Clear the username
        navigate("/login"); // Redirect to login page
    };

    return (
        <nav>
            <ul>
                <li><a href="/welcome">Home</a></li>
                <li><a href="/create-employee">Create Employee</a></li>{/* Use Link for navigation */}
                <li><a href="/employee-list">Employee List</a></li>
                <li style={{ float: "right" }}>
                    <span style={{ marginRight: "10px", color: "white" }}>
                        {formatUsername(employeeName)} {/* Display formatted username */}
                    </span>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
