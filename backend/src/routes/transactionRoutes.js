const express=require('express');
const { transactionsUpdate } = require('../controllers/transactionsController');


const router= express.Router()

router.post('/:user_id', transactionsUpdate)

module.exports=router