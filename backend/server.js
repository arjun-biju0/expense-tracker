const dotenv=require('dotenv')
const express=require('express');
const bcrypt=require('bcrypt');
const cors=require('cors')
const {Pool} = require('pg')
const pool=require('./src/config/db.js');
const errorHandling = require('./src/middlewares/error-handler.js');
const port =process.env.PORT || 3001;
const userRoutes=require('./src/routes/userRoutes.js')

dotenv.config()
const app=express()
app.use(express.json())
app.use(cors())
app.use('/',userRoutes)


app.use(errorHandling)


app.listen(port,()=>{
    console.log(`server running on port ${port}`);
    
})