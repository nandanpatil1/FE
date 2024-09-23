// src/components/CreateEmployee.js
import React, { useState } from "react";
import axios from "axios";
import Navbar from './Navbar'; // Import the Navbar component
import './CreateEmployee.css'; // Import the CSS file



const CreateEmployee = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [designation, setDesignation] = useState("");
    const [gender, setGender] = useState("");
    const [courses, setCourses] = useState([]);
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    const handleCourseChange = (e) => {
        const value = e.target.value;
        setCourses((prev) =>
            prev.includes(value) ? prev.filter((course) => course !== value) : [...prev, value]
        );
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateNumeric = (number) => {
        const regex = /^[0-9]*$/;
        return regex.test(number);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validations
        if (!validateEmail(email)) {
            setMessage("Invalid email format");
            return;
        }
        if (!validateNumeric(mobileNumber)) {
            setMessage("Mobile number must be numeric");
            return;
        }
        if (mobileNumber.length !== 10) {
            setMessage("Mobile number must be 10 digits");
            return;
        }
        if (!image || !["image/jpeg", "image/png"].includes(image.type)) {
            setMessage("Please upload a jpg or png file");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("mobileNumber", mobileNumber);
        formData.append("designation", designation);
        formData.append("gender", gender);
        formData.append("courses", JSON.stringify(courses));
        formData.append("image", image);

        try {
            const res = await axios.post("http://localhost:5000/create-employee", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setMessage(res.data.message); // Show success message
        } catch (error) {
            setMessage(error.response.data.message); // Show error message
        }
    };

    return (
        <div>
            <Navbar /> {/* Use the new Navbar component */}
            <div className="create-employee-container ">
                <h2>Create Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Mobile Number:</label>
                        <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
                    </div>
                    <div>
                        <label>Designation:</label>
                        <select value={designation} onChange={(e) => setDesignation(e.target.value)} required>
                            <option value="">Select</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>
                    <div>
                        <label>Gender:</label>
                        <label>
                            <input type="radio" value="M" checked={gender === "M"} onChange={(e) => setGender(e.target.value)} /> M
                        </label>
                        <label>
                            <input type="radio" value="F" checked={gender === "F"} onChange={(e) => setGender(e.target.value)} /> F
                        </label>
                    </div>
                    <div>
                        <label>Course:</label>
                        <label>
                            <input type="checkbox" value="MCA" onChange={handleCourseChange} /> MCA
                        </label>
                        <label>
                            <input type="checkbox" value="BCA" onChange={handleCourseChange} /> BCA
                        </label>
                        <label>
                            <input type="checkbox" value="BSC" onChange={handleCourseChange} /> BSC
                        </label>
                    </div>
                    <div>
                        <label>Upload Image:</label>
                        <input type="file" accept="image/png, image/jpeg" onChange={(e) => setImage(e.target.files[0])} required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateEmployee;
