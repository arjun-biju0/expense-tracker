const pool=require('../config/db.js');

const createBudgetTable=async ()=>{
    const queryText=`
        CREATE TABLE bugets (
        id SERIAL PRIMARY KEY,
        user_id SERIAL NOT NULL,
        category VARCHAR(10) NOT NULL,
        budget_amount DECIMAL(10, 2) NOT NULL
        
    )
    `
    try {
        pool.query(queryText);
        console.log("Budget Data Table created if not exists");
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports={createBudgetTable}