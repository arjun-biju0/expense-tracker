const pool = require("../config/db.js");

const addExpense=async(req,res,next)=>{
    // const {person, amount}=req.body
    try {

        const expenses  = req.body; // Expecting an array of expenses
        const user_id=req.user.userId
        console.log(expenses);
        
    
        if (!Array.isArray(expenses) || expenses.length === 0) {
          return res.status(400).json({ error: "Invalid expenses array" });
        }
    
        // Convert data into format suitable for bulk insert
        const values = expenses.map(exp => [
          user_id,
          exp.description,
          exp.amount,
          JSON.stringify(exp.splitWith),  // Convert splitWith to JSON format
        ]);
        console.log(values);
        
    
        const query = `
          INSERT INTO split_expenses (user_id, description, amount, split_with)
          VALUES ${values.map((_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4}::jsonb)`).join(", ")}
          RETURNING *;
        `;
    
        const flatValues = values.flat();
        const result = await pool.query(query, flatValues);
    
        res.json({ message: "Split expenses added successfully", data: result.rows });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
        
}

const getExpense=async(req,res,next)=>{
    const user_id=req.user.userId;
    try {
        const result = await pool.query("SELECT * FROM split_expenses where user_id= $1", [user_id]);
        // console.log(result.rows);
        const data = result.rows.map(row => {
            // console.log("Before Parsing:", row.split_with); // Debugging Step
        
            return {
                ...row,
                split_with: typeof row.split_with === "string" 
                    ? JSON.parse(row.split_with)  // Only parse if it's a string
                    : row.split_with // Otherwise, return as is (already an object)
            };
        });
        
        // console.log("Final Data:", data);
        
        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports={addExpense, getExpense}