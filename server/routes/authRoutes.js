import express from "express";
import { connectToDatabase } from "../lib/db.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Connect to the database
        const db = await connectToDatabase();

        // Check if the user already exists
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length > 0) {
            return res.status(404).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        await db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword]);

        // Send a success response
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Connect to the database
        const db = await connectToDatabase();

        // Check if the user already exists
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(409).json({ message: "User not existed" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, rows[0].password);

        if(!isMatch) {
            console.log('Password mismatch');  // Add logging to check if the comparison fails
            return res.status(400).json({message: "password was incorrect"})
        }

        const token = jwt.sign({id: rows[0].id},process.env.JWT_KEY, {expiresIn: "3h"})

        // Send a success response
        res.status(201).json({ token: token });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

const verifyToken = async(req,res,next) => {
    try{
        const token = req.headers['authorization'].split(' ')[1];
        if(!token) {
            return res.status(403).json({message: "No Token Provided"})
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userId = decoded.id;
        next()
    } catch (err) {
        return res.status(500).json({message: "server error"})
    }
}

router.get('/home', verifyToken, async (req,res) => {
    try{
        const db = await connectToDatabase();
        const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [req.userId]);
        if (rows.length === 0) {
            return res.status(409).json({ message: "User not existed" });
        }
        return res.status(201).json({user: rows[0]})
    }catch(err) {
        return res.status(500).json({message : "server error"})
    }
})

export default router;
