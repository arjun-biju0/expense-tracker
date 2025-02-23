import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Budget {
    id: number;
    category: string;
    amount: number;
}

const Budgeting: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transactions = location.state?.transactions || []; 

  // Retrieve saved budget goals from localStorage
  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const savedBudgets = localStorage.getItem("budgets");
    return savedBudgets ? JSON.parse(savedBudgets) : [];
  });

  const expenses = transactions.filter((t: any) => t.type === "Expense");
  // New budget entry state
  const [newBudget, setNewBudget] = useState({ category: "", amount: "" });
//   const totalSpent = expenses.reduce((sum: any, t: any) => sum + t.amount, 0);
  const [editBudgetId, setEditBudgetId] = useState<number | null>(null);
  const [newAmount, setNewAmount] = useState<number>(0);
//   const checkBudgets = async () => {
//     budgets.forEach(async (budget) => {
//       const spent = categoryExpenses[budget.category] || 0;
      
//       if (spent > budget.amount) {
//         // await fetch("http://localhost:5000/send-alert", {
//         //   method: "POST",
//         //   headers: { "Content-Type": "application/json" },
//         //   body: JSON.stringify({
//         //     email: "user@example.com", // Replace with actual user email from state
//         //     category: budget.category,
//         //     budget: budget.amount,
//         //     spent: spent,
//         //   }),
//         // });
//         const message="overspent"
//         await axios.post('http://localhost:3000/budget/updateBudget', )

//         console.log(`📧 Alert sent for ${budget.category}`);
//       }
//     });
//   };
  // Calculate total expenses per category
  const categoryExpenses: { [key: string]: number } = {};

    expenses.forEach((t: any) => {
    const category = t.description.toUpperCase(); // Convert to uppercase
    categoryExpenses[category] = (categoryExpenses[category] || 0) + t.amount;
    });
    const saveEdit =async () => {
        const token= localStorage.getItem('token')
        setBudgets(
          budgets.map((b) =>
            b.id === editBudgetId ? { ...b, amount: newAmount } : b
          )
        );
        // const budget=budgets.find(b=>b.id===editBudgetId)
        const newBudget={editBudgetId,newAmount}
        try {
            await axios.post('https://fj-be-r2-arjun-iit-kharagpur.onrender.com/budget/updateBudget',newBudget,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setEditBudgetId(null);
            
        } catch (error) {
            console.log(error);
            
        }
      };


  useEffect(()=>{
    const getAllBudgets=async()=>{
        const token= localStorage.getItem('token')
        const result=await axios.get('https://fj-be-r2-arjun-iit-kharagpur.onrender.com/budget/getAllBudgets',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const filteredBudgets = result.data.data.map(({ id, category , budget_amount }) => ({
            id,
            category,
            amount:budget_amount,
        }));
        setBudgets(filteredBudgets)
        
    }
    getAllBudgets()
    // checkBudgets()
  },[])

  // Handle budget input changes
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBudget({ ...newBudget, [e.target.name]: e.target.value });
  };
  
  // Add new budget goal
  const addBudget = async () => {
    const token= localStorage.getItem('token')
    if (!newBudget.category || !newBudget.amount) return;
    const sendBudget={category: newBudget.category.toUpperCase(), amount: parseFloat(newBudget.amount)}
    const updatedBudgets = [...budgets, { category: newBudget.category.toUpperCase(), amount: parseFloat(newBudget.amount) }];
    try {
        const result=await axios.post('https://fj-be-r2-arjun-iit-kharagpur.onrender.com/budget/addBudget', sendBudget, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setBudgets(updatedBudgets);
        localStorage.setItem("budgets", JSON.stringify(updatedBudgets));
        setNewBudget({ category: "", amount: "" });
        
    } catch (error) {
        console.log(error);
        
    }
  };

  
    const handleDelete=async (id: number)=>{
        console.log(id);
        
        const token= localStorage.getItem('token')
        try {
            await axios.post('https://fj-be-r2-arjun-iit-kharagpur.onrender.com/budget/deleteBudget',{id},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            window.location.reload();
            
        } catch (error) {
            console.log(error);
            
        }

    }
    const handleEdit=(budget: Budget)=>{
        setEditBudgetId(budget.id);
        setNewAmount(budget.amount);
    }
        
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-10 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-lg font-semibold">Finance Manager</h1>
        <div className="flex space-x-6">
          <button onClick={() => navigate("/dashboard")} className="hover:underline">Dashboard</button>
          <button onClick={() => navigate("/reports", { state: { transactions } })} className="hover:underline">Reports</button>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold">Budgeting</button>
        </div>
        <button 
          onClick={() => { localStorage.removeItem("token"); navigate("/"); }} 
          className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold"
        >
          Logout
        </button>
      </nav>

      {/* Page Content */}
      <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <h1 className="text-3xl font-semibold text-center mb-4">Budgeting</h1>

        {/* Add New Budget Goal */}
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            name="category"
            placeholder="Category (e.g., Food, Rent)"
            value={newBudget.category}
            onChange={handleBudgetChange}
            className="p-2 border rounded-md flex-1"
          />
          <input
            type="number"
            name="amount"
            placeholder="Budget Amount"
            value={newBudget.amount}
            onChange={handleBudgetChange}
            className="p-2 border rounded-md w-32"
          />
          <button onClick={addBudget} className="bg-blue-600 text-white px-4 py-2 rounded-md">Add</button>
        </div>

        {/* Budget List */}
        <div className="space-y-4">
        {budgets.length > 0 ? (
            budgets.map((budget, index) => {
            const spent = categoryExpenses[budget.category] || 0;
            const remaining = budget.amount - spent;
            const percentageSpent = Math.min((spent / budget.amount) * 100, 100);

            return (
                <div key={index} className="p-4 border rounded-lg bg-white shadow-md">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{budget.category}</h3>
                    {/* Edit & Delete Buttons */}
                    <div className="space-x-2">
                    {editBudgetId === budget.id ? (
                        <>
                        <button
                            onClick={saveEdit}
                            className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditBudgetId(null)}
                            className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        </>
                    ) : (
                        <>
                        <button
                            onClick={() => handleEdit(budget)}
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(budget.id)}
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                        </>
                    )}
                    </div>
                </div>

                <p className="text-sm text-gray-600">
                Budget:{" "}
                {editBudgetId === budget.id ? (
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(Number(e.target.value))}
                    className="border p-1 rounded w-24"
                  />
                ) : (
                  <b>${budget.amount}</b>
                )}
              </p>

                <p className="text-sm text-gray-600">Budget: <b>${budget.amount}</b></p>
                <p className="text-sm text-gray-600">Spent: <b>${spent}</b></p>
                <p className={`text-sm font-semibold ${remaining < 0 ? "text-red-600" : "text-green-600"}`}>
                    Remaining: ${remaining}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mt-2 relative">
                    <div
                    className={`h-4 rounded-full transition-all duration-500 ease-in-out ${
                        spent > budget.amount ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{ width: `${percentageSpent}%` }}
                    ></div>
                </div>

                {/* Over Budget Warning */}
                {spent > budget.amount && (
                    <p className="text-red-600 mt-2 font-semibold">
                    ⚠️ Over budget! Consider adjusting your expenses.
                    </p>
                )}
                </div>
            );
            })
        ) : (
            <p className="text-center text-gray-500">No budget goals set yet.</p>
        )}
        </div>

      </div>
    </div>
  );
};

export default Budgeting;
