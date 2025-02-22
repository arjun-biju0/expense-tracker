const pool = require("../config/db");
const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');

const userLogin=async(req,res,next)=>{
    const {username,password}=req.body;
    try {
        const result= await pool.query('SELECT * FROM users WHERE username = $1',[username])
        if (result.rows.length === 0) return res.status(400).json({ error: 'User not found' });
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword){
            return res.status(400).json({ error: 'Invalid credentials' });

        }
            
        // console.log();
        const token= jwt.sign({
            userId: user.id,
            username:user.username
        },
        process.env.JWT_SECRET,
        {'expiresIn':'1d'}
        )
        
        res.status(200).json({ 
            message: 'Login successful',
            token,
         });
    } catch (error) {
        
    }
}

module.exports= {userLogin}