const dotenv=require('dotenv')
const express=require('express');
const cors=require('cors')
const pool=require('./src/config/db.js');
const errorHandling = require('./src/middlewares/error-handler.js');
const port =process.env.PORT || 3001;
const userRoutes=require('./src/routes/userRoutes.js');
const transactionRoutes=require('./src/routes/transactionRoutes.js')
const budgetRoutes=require('./src/routes/budgetRoutes.js')
const splitExpenseRoutes=require('./src/routes/splitExpenseRoutes.js')
const { createUserTable } = require('./src/data/createUserTable.js');
const { createFinanceTable } = require('./src/data/createFinancialDataTable.js');
const { createTransactionTable } = require('./src/data/createTransactionTable.js');
const { transactionsUpdate } = require('./src/controllers/transactionsController.js');
const { createBudgetTable } = require('./src/data/createBudgetDataTable.js');
const { createSplitExpenseTable } = require('./src/data/createSplitExpenseTable.js');

dotenv.config()
const app=express()
app.use(express.json())
// app.use(cors())
app.use(cors({
    origin: "https://fj-be-r2-arjun-iit-kharagpur-1.onrender.com",  // Allow requests from your frontend during development
    methods: "GET,POST,PUT,DELETE",
    credentials: true,  // Allow cookies if needed
  }));
// createUserTable()
// createFinanceTable()
// createTransactionTable()
// createBudgetTable()
// createSplitExpenseTable()
app.use('/',userRoutes)
app.use('/dashboard',transactionRoutes)
app.use('/budget',budgetRoutes)
app.use('/splitExpenses', splitExpenseRoutes)

app.use(errorHandling)


app.listen(port,()=>{
    console.log(`server running on port ${port}`);
    
})