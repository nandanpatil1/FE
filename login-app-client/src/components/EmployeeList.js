import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar'; // Import the Navbar component
import './EmployeeList.css'; // Import the CSS file

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:5000/employees");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/employees/${id}`);
            fetchEmployees(); // Refresh the employee list
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-employee/${id}`);
    };

    return (
        <div>
            <Navbar /> {/* Add the Navbar component */}
            <h2>Employee List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Image</th> {/* Add Image column */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobileNumber}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.gender}</td>
                            <td>
                                {employee.imagePath && ( // Check if imagePath exists
                                    <img
                                        src={`http://localhost:5000/${employee.imagePath}`} // Adjusted to match your server
                                        alt={employee.name}
                                        style={{ width: "50px", height: "50px", borderRadius: "50%" }} // Optional styling
                                    />
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(employee._id)}>Edit</button>
                                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
