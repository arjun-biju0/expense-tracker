const express=require('express');
const { createUser, getAllUsers, getUserById } = require('../controllers/userController.js');
const { userLogin } = require('../controllers/loginController.js');


const router=express.Router();

router.post('/register',createUser);
router.get('/users',getAllUsers);
router.post('/login',userLogin)
router.get('/:id',getUserById)


module.exports=router