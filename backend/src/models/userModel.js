const pool=require('../config/db');
const bcrypt=require('bcrypt')

const getAllUsersService=async ()=>{
    const result= await pool.query('SELECT * FROM users2')
    return result.rows
}
const getUserByIdService=async(id)=>{
    const result=await pool.query('SELECT * FROM users2 where id= $1',[id]);
    return result.rows
}
const createUserService=async (name,username,email,password)=>{
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        "INSERT INTO users2 (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING id, username, email",
        [name, username, email, hashedPassword]
      );

    return result.rows[0]
}
const updateUserService=()=>{}
const deleteUserService=()=>{}

module.exports={getAllUsersService,getUserByIdService,createUserService,updateUserService,deleteUserService}