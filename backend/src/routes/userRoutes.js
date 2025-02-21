const express=require('express');
const { createUser, getAllUsers } = require('../controllers/userController.js');


const router=express.Router();

router.post('/register',createUser);
router.get('/users',getAllUsers);

module.exports=router