const pool=require('../config/db.js');

const createSplitExpenseTable=async ()=>{
    const queryText=`
        CREATE TABLE split_expenses (
        id SERIAL PRIMARY KEY,
        user_id SERIAL NOT NULL,
        description VARCHAR(100) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        split_with JSONB NOT NULL   
    )
    `
    try {
        pool.query(queryText);
        console.log("Split-Expense Data Table created if not exists");
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports={createSplitExpenseTable}