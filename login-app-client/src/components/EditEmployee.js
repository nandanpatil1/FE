// src/components/EditEmployee.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from './Navbar'; // Import the Navbar component
import './EditEmployee.css'; // Import the CSS file

const EditEmployee = () => {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        mobileNumber: "",
        designation: "",
        gender: "",
        courses: [],
    });
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/employees/${id}`);
                const employeeData = response.data;
                setEmployee({
                    ...employeeData,
                    courses: employeeData.courses || [], // Ensure courses are loaded as an array
                });
            } catch (error) {
                console.error("Error fetching employee:", error);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleCourseChange = (e) => {
        const value = e.target.value;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            courses: prevEmployee.courses.includes(value)
                ? prevEmployee.courses.filter((course) => course !== value)
                : [...prevEmployee.courses, value],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", employee.name);
        formData.append("email", employee.email);
        formData.append("mobileNumber", employee.mobileNumber);
        formData.append("designation", employee.designation);
        formData.append("gender", employee.gender);
        formData.append("courses", JSON.stringify(employee.courses)); // Convert courses array to string
        if (image) {
            formData.append("image", image);
        }

        try {
            await axios.put(`http://localhost:5000/employees/${id}`, formData);
            navigate("/employee-list"); // Redirect to employee list page
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    return (
        <div>
            <Navbar /> {/* Add the Navbar component */}
            <div className="edit-employee-container">
                <h2>Edit Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={employee.name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={employee.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input
                            type="text"
                            name="mobileNumber"
                            value={employee.mobileNumber}
                            onChange={handleChange}
                            placeholder="Mobile Number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Designation</label>
                        <select
                            name="designation"
                            value={employee.designation}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="M"
                                checked={employee.gender === "M"}
                                onChange={handleChange}
                            /> M
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="F"
                                checked={employee.gender === "F"}
                                onChange={handleChange}
                            /> F
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Course:</label>
                        <label>
                            <input
                                type="checkbox"
                                value="MCA"
                                checked={employee.courses.includes("MCA")}
                                onChange={handleCourseChange}
                            /> MCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="BCA"
                                checked={employee.courses.includes("BCA")}
                                onChange={handleCourseChange}
                            /> BCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="BSC"
                                checked={employee.courses.includes("BSC")}
                                onChange={handleCourseChange}
                            /> BSC
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input type="file" onChange={handleImageChange} />
                    </div>
                    <button type="submit" className="save-button">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;
