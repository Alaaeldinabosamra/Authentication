import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Edit() {
  // Step 1: Define state to hold the student data
  const [data, setData] = useState({
    name: '',
    email: '',
    gender: '',
    age: '',
    address: '',
    enrollment_date: '',
    phone_number: '',
    date_of_birth: '',
  });

  const { id } = useParams();  // Get the student ID from URL params
  const navigate = useNavigate();  // Navigate function to redirect user

  // Step 2: Fetch the existing data from the server when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:5000/get_student/${id}`)
      .then((res) => {
        const student = res.data[0];  // Assuming the response contains a single student object in an array
        setData({
          name: student.name,
          email: student.email,
          gender: student.gender,
          age: student.age,
          address: student.address,
          enrollment_date: student.enrollment_date.slice(0, 10),  // Remove time from date
          phone_number: student.phone_number,
          date_of_birth: student.date_of_birth.slice(0, 10),  // Remove time from date
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Step 3: Handle form submission (updating student data)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the updated values to the server via PUT request
    axios.put(`http://localhost:5000/edit_student/${id}`, data)
      .then((res) => {
        console.log('Student data updated successfully');
        navigate('/');  // Redirect user to home page after successful update
      })
      .catch((err) => console.log(err));
  };

  // Step 4: Handle form value changes to update state correctly
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="container-fluid bg-light py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex justify-content-end mb-3">
            <Link to="/" className="btn btn-success">Back</Link>
          </div>

          {/* Form to Edit Student */}
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
            <div className="form-group my-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                name="gender"
                value={data.gender}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                value={data.age}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                value={data.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="enrollment_date">Enrollment Date</label>
              <input
                type="date"
                name="enrollment_date"
                value={data.enrollment_date}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={data.phone_number}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="date_of_birth">Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={data.date_of_birth}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-success w-100 my-3">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
