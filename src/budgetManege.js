import React, { useState } from 'react';  

function BudgetManege() {  
  const [incomeSource, setIncome] = useState('');  
  const [expenseSource, setExpense] = useState('');  
  const [result, setResult] = useState(0);  
  const [incomes, setIncomes] = useState([]);  
  const [expenses, setExpenses] = useState([]);  
  const [totalIncome , setTotalIncome] = useState(0);
  const [totalExpense , setTotalExpense] = useState(0);

  const handleIncome = (e) => {  
    setIncome(e.target.value);  
  };  

  const handleExpense = (e) => {  
    setExpense(e.target.value);  
  };  

  const addIncome = () => {  
    const newIncome = parseFloat(incomeSource);  
    const newExpense = parseFloat(expenseSource);  

    if (incomeSource.trim() === "" || expenseSource.trim() === "") {  
      alert('Input a value');  
    }  
    else if (newIncome < 0 || newExpense < 0) {  
      alert('The value must be positive');  
    } else {  
      setIncomes((prev) => [...prev, newIncome]);  
      setExpenses((prev) => [...prev, newExpense]);

      const updatedTotalIncome = incomes.reduce((sum, item) => sum + item, 0) + newIncome;  
      const updatedTotalExpense = expenses.reduce((sum, item) => sum + item, 0) + newExpense;
      const res = updatedTotalIncome - updatedTotalExpense;  
      setResult(res);  

      setTotalIncome(updatedTotalIncome); 
      setTotalExpense(updatedTotalExpense);

      setIncome('');  
      setExpense('');  
    }  
  };  


  const resetAll = () => {  
    setIncomes([]);  
    setExpenses([]);  
    setTotalIncome(0);  
    setTotalExpense(0);  
    setResult(0);  
    setIncome('');  
    setExpense('');  
  };  


  return (  
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">  
      <h1 className="text-2xl font-bold text-center mb-4">Family Budget Management</h1>  
      <div className="flex flex-col space-y-4">  
        <input   
          type='number'   
          value={incomeSource}   
          onChange={handleIncome}   
          placeholder='Enter the Income'   
          min="0"  
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />  
        <input   
          type='number'   
          value={expenseSource}   
          onChange={handleExpense}   
          placeholder='Enter the Expense'   
          min="0"  
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />  
        <div className="flex space-x-4">  
          <button onClick={addIncome} className="bg-fuchsia-700 text-white px-4 py-2 rounded hover:bg-fuchsia-950">Add Value</button>  
          <button onClick={resetAll} className="bg-pink-400 text-gray-800 px-4 py-2 rounded hover:bg-pink-600">Reset</button>  
        </div>  
      </div>  

      <h4 className="text-lg font-semibold mt-4">Incomes:</h4>  
      <table className="w-full border border-cyan-300 mb-4">  
        <thead className="bg-cyan-300">  
          <tr>  
            <th className="border border-gray-300 p-2">Income</th>  
          </tr>  
        </thead>  
        <tbody>  
          {incomes.map((income, index) => (  
            <tr key={index}>  
              <td className="border border-gray-300 p-2">SYP  {income}</td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
      <h3 className="font-bold">Total Income: <span className="text-blue-600">{totalIncome}</span></h3>  

      <h4 className="text-lg font-semibold mt-4">Expenses:</h4>  
      <table className="w-full border border-rose-300 mb-4">  
        <thead className="bg-rose-400">  
          <tr>  
            <th className="border border-gray-300 p-2">Expense</th>  
          </tr>  
        </thead>  
        <tbody>  
          {expenses.map((expense, index) => (  
            <tr key={index}>  
              <td className="border border-gray-300 p-2">SYP  {expense}</td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
      <h3 className="font-bold">Total Expense: <span className="text-red-600">{totalExpense}</span></h3>  
      
      <div className="mt-4">  
        <h3 className="font-bold">Budget Summary: <span className={result < 0 ? "text-red-600" : "text-green-600"}>{result}</span></h3>  
      </div>  
    </div>  
  );  
}  

export default BudgetManege;