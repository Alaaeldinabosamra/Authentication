/**
 * to use import from syntax wirte "type":"module" in package.json file
 * instead of const require syntax
 * 
 */

import express from "express"
import cors from "cors"
import authRouter from "./routes/authRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)

app.listen(process.env.PORT,() => {
    console.log(`Server is Running on port ${process.env.PORT}`)
})

/**
 * table 1
 CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,  -- Automatically incrementing ID
  username VARCHAR(40) NOT NULL,      -- Username with a max length of 40
  email VARCHAR(30) NOT NULL,         -- Email with a max length of 30
  password VARCHAR(150) NOT NULL      -- Password with a max length of 150
    );
 */