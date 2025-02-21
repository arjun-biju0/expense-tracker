const pool=require('../config/db.js');

const createTransactionTable=async ()=>{
    const queryText=`
        CREATE TABLE transactions (
        id SERIAL PRIMARY KEY,
        user_id SERIAL NOT NULL,
        type VARCHAR(10) CHECK (type IN ('income', 'expense')) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        description VARCHAR(100) NOT NULL
        
    )
    `
    try {
        pool.query(queryText);
        console.log("Transaction Data Table created if not exists");
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports={createTransactionTable}