const pool = require("../config/db.js");

const addBudget=async (req,res,next)=>{
    const { category, amount} =req.body;
    const user_id=req.user.userId;
    
    try {
        await pool.query('INSERT INTO bugets ( user_id, category, budget_amount) VALUES ($1, $2, $3)',
            [user_id,category,amount]
        );
        res.status(200).json({ message: `budget added successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Database error', details: error.message });
    }

}

const getAllBudgets=async(req,res,next)=>{
    const user_id=req.user.userId;
    try {
        const result= await pool.query('SELECT * FROM bugets where user_id= $1',[user_id])
        res.status(200).json({data: result.rows})
    } catch (error) {
        res.status(500).json({ error: 'Database error', details: error.message })
    }
}

const updateBudget=async(req,res,next)=>{
    const user_id=req.user.userId;
    const {newAmount, editBudgetId}=req.body;
    
    try {
        const result=await pool.query('UPDATE bugets SET budget_amount= $1 where id= $2 AND  user_id= $3',[newAmount,editBudgetId,user_id])
        res.status(200).json({data: result.rows})
    } catch (error) {
        res.status(500).json({ error: 'Database error', details: error.message })
    }
}

const deleteBudget=async(req,res,next)=>{
    const user_id=req.user.userId;
    const {id}=req.body
    
    try {
        const result=await pool.query('DELETE from bugets where id= $1 AND user_id= $2',[id,user_id])
        res.status(200).json({data: result.rows})
    } catch (error) {
        res.status(500).json({ error: 'Database error', details: error.message })
        
    }
}

module.exports={addBudget, getAllBudgets, updateBudget, deleteBudget}