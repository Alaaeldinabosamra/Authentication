import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [data, setData] = useState([])
  const [deleted, setDeleted] = useState(true)

  useEffect(() => {
    if(deleted){
      setDeleted(false)
    }
    axios.get('http://localhost:5000/students')
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.log(err))
  }, [deleted])

function handleDelete(id) {
  axios.delete(`http://localhost:5000/delete_student/${id}`)
    .then((res) => {
      console.log('Student deleted successfully');
      setDeleted(true); // Trigger data re-fetch
    })
    .catch((err) => {
      // Improved error handling to log the error response
      console.log('Error deleting student:', err.response ? err.response.data : err);
    });
}

  // Function to format the date as "4 May 2025"
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert the string to Date
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="container-fluid bg-light vh-100">
      <div className="row">
        <h2 className="my-4 text-center text-dark">Student Details</h2>
        <div className="d-flex justify-content-end mb-3">
          <Link className="btn btn-primary" to="/create">Add Student</Link>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-secondary">
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Address</th>
              <th>Enrollment Date</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => {
              return (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.gender || 'Not provided'}</td>
                  <td>{student.email}</td>
                  <td>{student.address}</td>
                  <td>{formatDate(student.enrollment_date)}</td>
                  <td>{student.phone_number}</td>
                  <td>{formatDate(student.date_of_birth)}</td>
                  <td>
                    <Link className="btn btn-success me-2" to={`/read/${student.id}`}>Read</Link>
                    <Link className="btn btn-warning me-2" to={`/edit/${student.id}`}>Edit</Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home;
