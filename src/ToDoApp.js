import React, { useState } from "react";

function ToDoApp() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [approvedTasks, setApprovedTasks] = useState([]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue !== "") {
      setTasks([...tasks, inputValue]);
      setInputValue("");
    }
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((a, i) => i !== index);
    setTasks(newTasks);
  };

  const handleUpdate = (index) => {
    const updatedValue = prompt("Update task:", tasks[index]);
    if (updatedValue) {
      const newTasks = tasks.map((task, i) =>
        i === index ? updatedValue : task
      );
      setTasks(newTasks);
    }
  };

  const handleApprove = (index) => {
    setApprovedTasks([...approvedTasks, tasks[index]]);
    handleDelete(index);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">ToDoApp</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Add new task..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </form>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">All tasks</h2>
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border-b"
            >
              <span>{task}</span>
              <div>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdate(index)}
                  className="text-blue-500 mx-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleApprove(index)}
                  className="text-green-500"
                >
                  Approve
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Approved tasks</h2>
        <ul>
          {approvedTasks.map((task, index) => (
            <li key={index} className="p-2 border-b">
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoApp;