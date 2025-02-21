const pool = require("../config/db");
const bcrypt=require('bcrypt');

const userLogin=async(req,res,next)=>{
    const {username,password}=req.body;
    try {
        const result= await pool.query('SELECT * FROM users WHERE username = $1',[username])
        console.log(result.rows);
        
        if (result.rows.length === 0) return res.status(400).json({ error: 'User not found' });
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });
        // console.log();
        
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        
    }
}

module.exports= {userLogin}