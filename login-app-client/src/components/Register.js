// src/components/Register.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link
import './Register.css'; // Import CSS file

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/register", { username, password });
            setMessage(res.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
            {message && <p className="message">{message}</p>}
            {message && message.includes("successfully") && (
                <p>
                    Registration successful! You can now <Link to="/login">login here</Link>.
                </p>
            )}
        </div>
    );
};

export default Register;
