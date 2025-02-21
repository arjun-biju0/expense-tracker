const dotenv=require('dotenv')
const express=require('express');
const cors=require('cors')
const pool=require('./src/config/db.js');
const errorHandling = require('./src/middlewares/error-handler.js');
const port =process.env.PORT || 3001;
const userRoutes=require('./src/routes/userRoutes.js');
const transactionRoutes=require('./src/routes/transactionRoutes.js')
const { createUserTable } = require('./src/data/createUserTable.js');
const { createFinanceTable } = require('./src/data/createFinancialDataTable.js');
const { createTransactionTable } = require('./src/data/createTransactionTable.js');
const { transactionsUpdate } = require('./src/controllers/transactionsController.js');

dotenv.config()
const app=express()
app.use(express.json())
app.use(cors())
// createUserTable()
// createFinanceTable()
// createTransactionTable()
app.use('/',userRoutes)
app.use('/dashboard',transactionRoutes)

app.use(errorHandling)


app.listen(port,()=>{
    console.log(`server running on port ${port}`);
    
})