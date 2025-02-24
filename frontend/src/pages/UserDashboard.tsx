import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [user,setUser] = useState("");
  const [transactions, setTransactions] = useState<
    { id: number; amount: number; type: string; description: string, date: string }[]
  >([]);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Income");
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]); // Default to today
  const navigate=useNavigate()
  const auth=async ()=>{
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, redirecting to login...');
      // Redirect user to login page if token is missing
      window.location.href = '/';
      return;
    }
    // try {
    //     const response = await axios.get('http://localhost:3000/auth', {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });

    //     console.log('Dashboard Data:', response.data);
    // } catch (error) {
    //     console.error('Error fetching dashboard:', error.response?.data || error.message);
    //     window.location.href = '/';

    //     if (error.response?.status === 401 || error.response?.status === 403) {
    //         console.log('Token expired or invalid, redirecting to login...');
    //         localStorage.removeItem('token'); // Clear invalid token
    //         // Redirect user to login page
    //         window.location.href = '/';
    //     }
    // }
    
  }
  auth()
  useEffect(()=>{
    const getTransactions=async()=>{
        const token=localStorage.getItem('token')
        const result=await axios.get(`https://fj-be-r2-arjun-iit-kharagpur.onrender.com/dashboard/getTransactions`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setUser(result.data.username)
        const modifiedTransactions = result.data.data.map((transaction: any) => ({
            ...transaction,
            type: transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1), // Capitalize first letter
            amount:Number(transaction.amount)
        }));
        setTransactions(modifiedTransactions)
        
    }
    getTransactions()
  },[])

  // Calculate financial summary
  
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount,0);
  const totalExpenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const savings = totalIncome - totalExpenses;

  // Add transaction
  const handleAddTransaction = async () => {
    if (!amount || !description) return;
    const newTransaction = {
      id: transactions.length + 1,
      amount,
      type,
      description,
      date
    };
    console.log(newTransaction);
    
    const token = localStorage.getItem('token');
    await axios.post(`https://fj-be-r2-arjun-iit-kharagpur.onrender.com/dashboard/addTransaction`, newTransaction,{
      headers: {
          Authorization: `Bearer ${token}`
      }
  },)    
    setTransactions([...transactions, newTransaction]);
    setAmount(0);
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]); // Reset to today's date
    // window.location.reload()
  };

  const handleLogout=()=>{
    localStorage.removeItem("token"); // Clear token or session storage
    navigate("/"); // Redirect to login page

  }

  // Delete transaction
  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Chart Data
  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ["#4CAF50", "#F44336"],
        hoverBackgroundColor: ["#388E3C", "#D32F2F"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-10 py-4 shadow-md w-full flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance Manager</h1>
        <div className="flex space-x-6">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold">
            Dashboard
          </button>
          <button onClick={() => navigate("/reports", { state: { transactions } })} className="hover:underline">Reports</button>
          <button onClick={()=> navigate("/budgeting", { state: { transactions } })} className="hover:underline">Budgeting</button>
          <button onClick={()=> navigate("/splitExpenses", { state: { transactions } })} className="hover:underline">Split Expense</button>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold"
        >
          Logout
        </button>
      </nav>

      {/* Dashboard Content */}
      <div className="w-full px-10 py-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Welcome, {user}! 🎉
        </h2>

        {/* Financial Overview */}
        <div className="grid grid-cols-3 gap-6">
          <div className="p-6 bg-green-100 rounded-lg text-center">
            <h3 className="text-lg font-semibold">Total Income</h3>
            <p className="text-2xl font-bold">${totalIncome}</p>
          </div>
          <div className="p-6 bg-red-100 rounded-lg text-center">
            <h3 className="text-lg font-semibold">Total Expenses</h3>
            <p className="text-2xl font-bold">${totalExpenses}</p>
          </div>
          <div className="p-6 bg-yellow-100 rounded-lg text-center">
            <h3 className="text-lg font-semibold">Savings</h3>
            <p className="text-2xl font-bold">${savings}</p>
          </div>
        </div>

        {/* Add Transaction */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center">Add a Transaction</h3>
          <div className="mt-4 flex space-x-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Amount"
              className="p-3 border rounded-md w-1/5"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="p-3 border rounded-md w-1/3"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 border rounded-md w-1/5"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-3 border rounded-md w-1/5"
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <button
              onClick={handleAddTransaction}
              className="bg-blue-600 text-white px-4 py-3 rounded-md font-semibold"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Transaction List */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-sm mt-2">No transactions added yet.</p>
          ) : (
            // Scrollable container with max height
            <div className="mt-2 max-h-60 overflow-y-auto border rounded-lg">
              <ul>
                {transactions.map((t) => (
                  <li
                    key={t.id}
                    className="p-3 border-b flex justify-between items-center"
                  >
                    <span>{t.description}</span>
                    <span
                      className={`${
                        t.type === "Income" ? "text-green-600" : "text-red-600"
                      } text-lg font-bold`}
                    >
                      ${t.amount}
                    </span>
                    <span>{t.date}</span>
                    <button
                      onClick={() => handleDeleteTransaction(t.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>


        {/* Pie Chart */}
        <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold text-center">Income vs Expenses</h3>
          <div className="flex justify-center mt-4">
            <div className="w-64 h-64">
              <Pie data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
