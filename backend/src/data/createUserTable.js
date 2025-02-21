
const pool=require('../config/db.js');

const createUserTable=async ()=>{
    const queryText=`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    )
    `
    try {
        pool.query(queryText);
        console.log("User Table created if not exists");
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports={createUserTable}