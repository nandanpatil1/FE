// src/components/Welcome.js
import React from "react";
import Navbar from './Navbar'; // Import the Navbar component

const Welcome = () => {
    // Get the logged-in employee's username from local storage
    const employeeName = localStorage.getItem("username") || "Guest";

    // Function to format username (capitalize first letter)
    const formatUsername = (name) => {
        if (!name) return "Guest";
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    return (
        <div>
            <Navbar /> {/* Use the new Navbar component */}
            <h1>Welcome to the Dashboard, {formatUsername(employeeName)}!</h1>
        </div>
    );
};

export default Welcome;
