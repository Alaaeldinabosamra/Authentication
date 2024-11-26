import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

function Read() {

  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/get_student/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="container-fluid bg-light py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex justify-content-end mb-3">
            <Link to="/" className="btn btn-success">Back</Link>
          </div>

          {data.length === 0 ? (
            <p className="text-center">Loading data...</p>
          ) : (
            <div className="card p-4 shadow-sm">
              <h3 className="text-center mb-4">Student Details</h3>
              <ul className="list-unstyled">
                {data.map((student) => (
                  <li key={student.id} className="mb-3">
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <strong>ID:</strong>
                      </div>
                      <div className="col-12 col-md-8">
                        {student.id}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <strong>Name:</strong>
                      </div>
                      <div className="col-12 col-md-8">
                        {student.name}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <strong>Age:</strong>
                      </div>
                      <div className="col-12 col-md-8">
                        {student.age}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <strong>Gender:</strong>
                      </div>
                      <div className="col-12 col-md-8">
                        {student.gender || 'Not provided'}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <strong>Email:</strong>
                      </div>
                      <div className="col-12 col-md-8">
                        {student.email}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <strong>Address:</strong>
                      </div>
                      <div className="col-12 col-md-8">
                        {student.address}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <strong>Enrollment Date:</strong>
                      </div>
                      <div className="col-12 col-md-8">
                        {new Date(student.enrollment_date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <strong>Phone Number:</strong>
                      </div>
                      <div className="col-12 col-md-8">
                        {student.phone_number}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <strong>Date of Birth:</strong>
                      </div>
                      <div className="col-12 col-md-8">
                        {new Date(student.date_of_birth).toLocaleDateString()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Read;
