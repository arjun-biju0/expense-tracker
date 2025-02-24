const express=require('express');
const verifyToken = require('../middlewares/jwtVerify');
const { addExpense, getExpense } = require('../controllers/splitExpenseController');
const { route } = require('./userRoutes');

const router= express.Router()

router.post('/addExpense', verifyToken, addExpense)
router.get('/getSplit',verifyToken,getExpense)

module.exports= router;