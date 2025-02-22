const pool = require("../config/db.js");

const transactionsUpdate=async(req,res,next)=>{
    const { type, amount, description, date} = req.body;
    const user_id=req.user.userId;
    const lowerType=type.toLowerCase();

    if (!['income', 'expense'].includes(lowerType) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid transaction type or amount' });
    }

    try {
        if(type==='expense'){
            
            await pool.query(
                'INSERT INTO transactions ( user_id, type, amount, description, date) VALUES ($1, $2, $3, $4, $5)',
                [ user_id, lowerType, amount, description, date]
            );
        }
        else{
            await pool.query(
                'INSERT INTO transactions ( user_id, type, amount, description, date) VALUES ($1, $2, $3, $4, $5)',
                [user_id, lowerType, amount, description, date]
            );
        }
        res.status(200).json({ message: `${type} added successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
}

const getTransactions=async(req,res,next)=>{
    const user_id=req.user.userId;
    try {
        const result=await pool.query('SELECT * FROM transactions where user_id= $1',[user_id])
        // console.log(result);
        res.status(200).json({data: result.rows, username:req.user.username})
        
    } catch (error) {
        res.status(500).json({ error: 'Database error', details: err.message })
    }
}

module.exports={transactionsUpdate, getTransactions}