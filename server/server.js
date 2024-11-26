const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');
const path = require("path");

const app = express();

// Middleware setup
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "students"
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the database");
});

const port = 5000;

// Add user endpoint
app.post("/add_user", (req, res) => {
  const sql = `INSERT INTO studentdetails 
  (name, age, gender, email, address, enrollment_date, phone_number, date_of_birth) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    req.body.name,
    req.body.age,
    req.body.gender,
    req.body.email,
    req.body.address,
    req.body.enrollment_date,
    req.body.phone_number,
    req.body.date_of_birth
  ];

  // Execute the query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data: ", err);
      return res.status(500).json({ message: "Something unexpected has occurred. " + err });
    }
    
    console.log("Student added successfully:", result);
    return res.status(200).json({ success: "Student added successfully", studentId: result.insertId });
  });
});

app.get("/students", (req,res) => {
    const sql = `SELECT * FROM studentdetails`
    db.query(sql,(err, result) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).json({ message: "Server error" });
        }

        // Send the result only once
        return res.json(result);
    })
})
app.get("/get_student/:id", (req,res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM studentdetails WHERE id = ? `;
    db.query(sql,[id],(err, result) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).json({ message: "Server error" });
        }
    
        // Send the result only once
        console.log(result)
        return res.json(result);
    })
    
})
app.put("/edit_student/:id", (req, res) => {
    const { name, email, age, gender, address, enrollment_date, phone_number, date_of_birth } = req.body; // Read data from req.body
    const id = req.params.id; // Read the student id from the URL

    // SQL query to update the student data
    const sql = `UPDATE studentdetails 
                 SET name = ?, email = ?, age = ?, gender = ?, address = ?, enrollment_date = ?, phone_number = ?, date_of_birth = ? 
                 WHERE id = ?`;

    // Values to replace the placeholders in the SQL query
    const values = [name, email, age, gender, address, enrollment_date, phone_number, date_of_birth, id];

    // Execute the query with the correct values
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating student:", err); // Log the error for debugging
            return res.status(500).json({ message: "Server error" });
        }

        // Send a success response with the result
        return res.json({ message: "Student updated successfully", result });
    });
});
app.delete("/delete_student/:id", (req, res) => {
    const id = req.params.id; 
    const sql = "DELETE FROM studentdetails WHERE id = ?";

    const values = [id];

    
    // Execute the query with the correct values
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating student:", err); // Log the error for debugging
            return res.status(500).json({ message: "Server error" });
        }

        // Send a success response with the result
        return res.json({ message: "Student deleted successfully", result });
    });
});


// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
