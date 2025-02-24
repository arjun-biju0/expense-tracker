import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const Reports: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const transactions = location.state?.transactions || [];

  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const filteredTransactions = transactions.filter((t:any) => t.date.startsWith(selectedMonth));

  const totalIncome = filteredTransactions.filter((t:any) => t.type === "Income").reduce((sum:any, t:any) => sum + t.amount, 0);
  const totalExpenses = filteredTransactions.filter((t:any) => t.type === "Expense").reduce((sum: any, t:any) => sum + t.amount, 0);

  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: `Report for ${selectedMonth}`,
        data: [totalIncome, totalExpenses],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };const auth=async ()=>{
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

  
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      {/* Navbar (Copied from Dashboard) */}
      <nav className="bg-blue-600 text-white px-10 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance Manager</h1>
        <div className="flex space-x-6">
          <button onClick={() => navigate("/dashboard")} className="hover:underline">Dashboard</button>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold">Reports</button>
          <button onClick={()=> navigate("/budgeting", { state: { transactions } })} className="hover:underline">Budgeting</button>
          <button onClick={()=> navigate("/splitExpenses", { state: { transactions } })} className="hover:underline">Split Expense</button>
        </div>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold">
          Logout
        </button>
      </nav>

      {/* Page Content */}
      <div className="w-full px-10 py-6">
        <h1 className="text-3xl font-semibold text-center">Financial Reports</h1>

        {/* Month Selector */}
        <div className="mt-6 text-center">
          <label className="mr-2 font-semibold">Select Month:</label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="p-2 border rounded-md"
          />
        </div>

        {/* Report Summary */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="p-6 bg-green-100 rounded-lg text-center">
            <h3 className="text-lg font-semibold">Income</h3>
            <p className="text-2xl font-bold">${totalIncome}</p>
          </div>
          <div className="p-6 bg-red-100 rounded-lg text-center">
            <h3 className="text-lg font-semibold">Expenses</h3>
            <p className="text-2xl font-bold">${totalExpenses}</p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold text-center">Monthly Financial Report</h3>
          <div className="w-96 mx-auto">
            <Bar data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
