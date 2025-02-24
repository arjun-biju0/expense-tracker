import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate, useLocation } from "react-router-dom";

type SplitTransaction = {
  id: number;
  description: string;
  amount: number;
  splitWith: { name: string; amount: number }[];
};

const SplitExpenses : React.FC= () => {
    const navigate = useNavigate();
    const location = useLocation();
  const [balances, setBalances] = useState<{ [key: string]: number }>({});
  const [expense,setExpense]= useState<SplitTransaction[]>([]);
  const transactions = location.state?.transactions || [];
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    splitWith: [] as { name: string; amount: number }[],
  });
  console.log(expense);
  
  useEffect(()=>{
    const getExpense=async()=>{
        const token=localStorage.getItem('token')
        const result=await axios.get(`https://fj-be-r2-arjun-iit-kharagpur.onrender.com/splitExpenses/getSplit`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(result.data.data);
        setExpense(result.data.data)
        calculateBalances(result.data.data);
        
    }
    getExpense();
  },[])

  // Add Transaction
  const addTransaction = () => {
    const token = localStorage.getItem('token');
    const amount = parseFloat(newExpense.amount);
    if (!amount || newExpense.description.trim() === "") return;

    const updatedTransactions = [
      { id: Date.now(), ...newExpense, amount },
    ];
    axios.post('https://fj-be-r2-arjun-iit-kharagpur.onrender.com/splitExpenses/addexpense',updatedTransactions,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    setExpense(updatedTransactions);
    updateBalances(updatedTransactions);
    setNewExpense({ description: "", amount: "", splitWith: [] });
  };

  // Update Balances
  const updateBalances = (expense: SplitTransaction[]) => {
    const balanceMap: { [key: string]: number } = {};

    expense.forEach((t) => {
      t.splitWith.forEach(({ name, amount }) => {
        balanceMap[name] = (balanceMap[name] || 0) + amount;
      });
    });

    setBalances(balanceMap);
  };
  const calculateBalances = (transactions: SplitTransaction[]) => {
    const balanceMap: { [key: string]: number } = {};

    transactions.forEach((t) => {
      t.splitWith.forEach(({ name, amount }) => {
        balanceMap[name] = (balanceMap[name] || 0) + amount;
      });
    });

    setBalances(balanceMap);
  };

  // Mark Debt as Settled
  const settleDebt = (name: string) => {
    setBalances((prev) => ({ ...prev, [name]: 0 }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-10 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-lg font-semibold">Finance Manager</h1>
        <div className="flex space-x-6">
          <button onClick={() => navigate("/dashboard")} className="hover:underline">Dashboard</button>
          <button onClick={() => navigate("/reports", { state: { transactions } })} className="hover:underline">Reports</button>
          <button onClick={() => navigate("/budgeting", { state: { transactions } })} className="hover:underline">Budgeting</button>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold">Split Expense</button>
        </div>
        <button 
          onClick={() => { localStorage.removeItem("token"); navigate("/"); }} 
          className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold"
        >
          Logout
        </button>
      </nav>

      {/* Add Split Transaction */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-bold">Add Split Expense</h2>
        <input
          type="text"
          placeholder="Description"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          className="w-full p-2 mt-2 border rounded"
        />
        <input
          type="number"
          placeholder="Total Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          className="w-full p-2 mt-2 border rounded"
        />

        {/* Add People to Split With */}
        <div className="mt-2">
          <h3 className="font-medium">Split With:</h3>
          <button
            onClick={() => setNewExpense({ ...newExpense, splitWith: [...newExpense.splitWith, { name: "", amount: 0 }] })}
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            + Add Person
          </button>

          {newExpense.splitWith.map((person, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Name"
                value={person.name}
                onChange={(e) => {
                  const updated = [...newExpense.splitWith];
                  updated[index].name = e.target.value;
                  setNewExpense({ ...newExpense, splitWith: updated });
                }}
                className="p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Amount"
                value={person.amount}
                onChange={(e) => {
                  const updated = [...newExpense.splitWith];
                  updated[index].amount = parseFloat(e.target.value) || 0;
                  setNewExpense({ ...newExpense, splitWith: updated });
                }}
                className="p-2 border rounded"
              />
            </div>
          ))}
        </div>

        <button onClick={addTransaction} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
          Add Expense
        </button>
      </div>

      {/* Expense Balances */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-lg font-bold">Who Owes Whom</h2>
        {Object.keys(balances).length === 0 ? (
          <p className="text-gray-500 text-sm mt-2">No balances to show.</p>
        ) : (
          <ul className="mt-2">
            {Object.entries(balances).map(([name, amount], index) => (
              <li key={index} className="p-3 border-b flex justify-between items-center">
                <span>{name} owes: ${amount.toFixed(2)}</span>
                <button
                  onClick={() => settleDebt(name)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                >
                  Mark Settled
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SplitExpenses;
