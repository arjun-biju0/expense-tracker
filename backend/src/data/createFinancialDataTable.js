const pool=require('../config/db.js');

const createFinanceTable=async ()=>{
    const queryText=`
        CREATE TABLE financial_data (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        total_income DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        total_expense DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        savings DECIMAL(10, 2) GENERATED ALWAYS AS (total_income - total_expense) STORED
    )
    `
    try {
        pool.query(queryText);
        console.log("Financial Data Table created if not exists");
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports={createFinanceTable}