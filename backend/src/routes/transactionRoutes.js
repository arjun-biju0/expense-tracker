const express=require('express');
const { transactionsUpdate, getTransactions } = require('../controllers/transactionsController');
const verifyToken = require('../middlewares/jwtVerify');


const router= express.Router()

router.post('/addTransaction', verifyToken,transactionsUpdate)
router.get('/getTransactions',verifyToken ,getTransactions)

module.exports=router