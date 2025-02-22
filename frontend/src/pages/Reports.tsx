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
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      {/* Navbar (Copied from Dashboard) */}
      <nav className="bg-blue-600 text-white px-10 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance Manager</h1>
        <div className="flex space-x-6">
          <button onClick={() => navigate("/dashboard")} className="hover:underline">Dashboard</button>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold">Reports</button>
          <button className="hover:underline">Budgeting</button>
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
