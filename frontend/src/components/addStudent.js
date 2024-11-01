import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { z } from "zod";

// Define Zod schema
const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long.")
    .max(50, "Name cannot exceed 50 characters."),
  age: z
    .number()
    .min(0, "Age must be a positive number.")
    .max(120, "Age must be realistic."),
  course: z.string().min(3, "Course name must be at least 3 characters long."),
  phonenumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),
});

function AddStudent() {
  const location = useLocation();
  const navigate = useNavigate();
  const studentData = location.state?.studentData || null;
  const isUpdate = location.state?.isUpdate || false;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [errors, setErrors] = useState({});

  // Populate form fields in update mode
  useEffect(() => {
    if (isUpdate && studentData) {
      setName(studentData.name);
      setAge(studentData.age);
      setCourse(studentData.course);
      setPhonenumber(studentData.phonenumber);
    }
  }, [studentData, isUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors before validation
    const formData = {
      name,
      age: Number(age),
      course,
      phonenumber,
    };

    try {
      // Validate form data
      userSchema.parse(formData);
      // If validation is successful, proceed with API call
      if (isUpdate) {
        await axios.put(
          `http://localhost:4000/api/users/${studentData._id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:4000/api/users", formData);
      }
      navigate("/"); // Redirect after successful submission
    } catch (error) {
      if (error.errors) {
        const errorMessages = {};
        error.errors.forEach((err) => {
          errorMessages[err.path[0]] = err.message; // Map error messages to fields
        });
        setErrors(errorMessages);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <button
          type="button"
          className="text-gray-900 mr-10 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          <Link to="/" className="nav-link">
            Back
          </Link>
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter student's name"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter student's age"
              required
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Course
            </label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter student's course"
              required
            />
            {errors.course && (
              <p className="text-red-500 text-sm">{errors.course}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              type="text"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Enter student's phone number"
              required
            />
            {errors.phonenumber && (
              <p className="text-red-500 text-sm">{errors.phonenumber}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition"
          >
            {isUpdate ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
