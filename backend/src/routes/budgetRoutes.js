const express=require('express');
const verifyToken = require('../middlewares/jwtVerify');
const { addBudget, getAllBudgets, updateBudget, deleteBudget } = require('../controllers/budgetController');

const router= express.Router()

router.post('/addBudget', verifyToken, addBudget);
router.get('/getAllBudgets', verifyToken, getAllBudgets);
router.post('/updateBudget',verifyToken,updateBudget)
router.post('/deleteBudget', verifyToken, deleteBudget)

module.exports=router