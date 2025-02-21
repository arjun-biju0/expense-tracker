const pool = require("../config/db.js");

const transactionsUpdate=async(req,res,next)=>{
    const { type, amount, description} = req.body;
    const {user_id}=req.params;
    const lowerType=type.toLowerCase();

    if (!['income', 'expense'].includes(lowerType) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid transaction type or amount' });
    }

    try {
        if(type==='expense'){
            
            await pool.query(
                'INSERT INTO transactions ( user_id, type, amount, description) VALUES ($1, $2, $3, $4)',
                [ user_id, lowerType, amount, description]
            );
        }
        else{
            await pool.query(
                'INSERT INTO transactions ( user_id, type, amount, description) VALUES ($1, $2, $3, $4)',
                [user_id, lowerType, amount, description]
            );
        }
        res.status(200).json({ message: `${type} added successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
    }
}

module.exports={transactionsUpdate}