const dotenv=require('dotenv')
const express=require('express');
const bcrypt=require('bcrypt');
const cors=require('cors')
const {Pool} = require('pg')
const pool=require('./src/config/db.js');
const errorHandling = require('./src/middlewares/error-handler.js');
const port =process.env.PORT || 3001;
const userRoutes=require('./src/routes/userRoutes.js')

dotenv.config()
const app=express()
app.use(express.json())
app.use(cors())
app.use('/',userRoutes)


app.use(errorHandling)


// app.post("/register", async (req, res) => {
//     console.log(req.body);
    
//     try {
//         const { name, username, email, password } = req.body;
//           const hashedPassword = await bcrypt.hash(password, 10);
  
//       const result = await pool.query(
//         "INSERT INTO users2 (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING id, username, email",
//         [name, username, email, hashedPassword]
//       );
  
//       res.status(201).json({ message: "User registered", user: result.rows[0] });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Registration failed" });
//     }
//   });

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
    
})