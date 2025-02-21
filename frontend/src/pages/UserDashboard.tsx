import React, { useState } from "react";

const Dashboard: React.FC = () => {
  const [user] = useState("Arjun");
  const [transactions, setTransactions] = useState<
    { id: number; amount: number; type: string; description: string }[]
  >([]);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Income");

  // Calculate financial summary
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const savings = totalIncome - totalExpenses;

  // Add transaction
  const handleAddTransaction = () => {
    if (!amount || !description) return;
    const newTransaction = {
      id: transactions.length + 1,
      amount,
      type,
      description,
    };
    setTransactions([...transactions, newTransaction]);
    setAmount(0);
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-blue-600 text-white px-6 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Finance Manager</h1>
          <div className="flex space-x-4">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold">
              Dashboard
            </button>
            <button className="hover:underline">Reports</button>
            <button className="hover:underline">Budgeting</button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center">
          Welcome, {user}! 🎉
        </h2>

        {/* Financial Overview */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-100 rounded-lg text-center">
            <h3 className="text-sm font-semibold">Total Income</h3>
            <p className="text-lg font-bold">${totalIncome}</p>
          </div>
          <div className="p-4 bg-red-100 rounded-lg text-center">
            <h3 className="text-sm font-semibold">Total Expenses</h3>
            <p className="text-lg font-bold">${totalExpenses}</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg text-center">
            <h3 className="text-sm font-semibold">Savings</h3>
            <p className="text-lg font-bold">${savings}</p>
          </div>
        </div>

        {/* Add Transaction */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-center">Add a Transaction</h3>
          <div className="mt-4 flex space-x-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="w-1/4 p-2 border rounded-md"
              placeholder="Amount"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-1/2 p-2 border rounded-md"
              placeholder="Description"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option>Income</option>
              <option>Expense</option>
            </select>
            <button
              onClick={handleAddTransaction}
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold"
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
            <ul className="mt-2">
              {transactions.map((t) => (
                <li key={t.id} className="p-2 border-b flex justify-between">
                  <span>{t.description}</span>
                  <span
                    className={`${
                      t.type === "Income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ${t.amount}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
