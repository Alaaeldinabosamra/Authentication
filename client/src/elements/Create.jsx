import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import { Link, useNavigate } from 'react-router-dom';

function Create() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    address: '',
    enrollment_date: '',
    phone_number: '',
    date_of_birth: ''
  });

  function handleSubmit(e) {
    e.preventDefault();

    // Make sure the values array is correctly structured
    axios
      .post('http://localhost:5000/add_user', values)
      .then((res) => {
        navigate('/');
        console.log(res);
        // Optionally, reset the form after successful submission
        setValues({
          name: '' || values.name.trim(),
          email: '',
          age: '',
          gender: '',
          address: '',
          enrollment_date: '',
          phone_number: '',
          date_of_birth: ''
        });
      })
      .catch((err) => console.log(err + `there is error`));
  }

  return (
    <div className="container-fluid bg-light" style={{ minHeight: '100vh' }}>
      <div className="row justify-content-center">
        <h3 className="my-4 text-center text-dark">Add Student</h3>
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex justify-content-end mb-3">
            <Link to="/" className="btn btn-success">Home</Link>
          </div>

          {/* Form section */}
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm" style={{ minHeight: '100vh' }}>
            <div className="form-group my-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                name="gender"
                value={values.gender}
                onChange={(e) => setValues({ ...values, gender: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                value={values.age}
                onChange={(e) => setValues({ ...values, age: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                value={values.address}
                onChange={(e) => setValues({ ...values, address: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="enrollment_date">Enrollment Date</label>
              <input
                type="date"
                name="enrollment_date"
                value={values.enrollment_date}
                onChange={(e) => setValues({ ...values, enrollment_date: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={values.phone_number}
                onChange={(e) => setValues({ ...values, phone_number: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="date_of_birth">Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={values.date_of_birth}
                onChange={(e) => setValues({ ...values, date_of_birth: e.target.value })}
                className="form-control"
              />
            </div>
            {/* Add more fields as needed */}
            <button type="submit" className="btn btn-success w-100 my-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
