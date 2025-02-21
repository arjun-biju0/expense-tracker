const express=require('express');
const { transactionsUpdate, getTransactions } = require('../controllers/transactionsController');


const router= express.Router()

router.post('/:user_id', transactionsUpdate)
router.get('/:user_id',getTransactions)

module.exports=router