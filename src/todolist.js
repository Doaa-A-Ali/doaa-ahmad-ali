import React, { useState } from "react";

export default function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');
    const [editId, setEditId] = useState(null); 

    function submit(e) {
        e.preventDefault();
        if (editId) {
            setTasks(tasks.map(task => 
                task.id === editId ? { ...task, text } : task
            ));
            setEditId(null);
        } else {
            // Add new task
            const newTask = {
                id: tasks.length + 1,
                text,
                completed: false
            };
            setTasks([...tasks, newTask]);
        }
        setText('');
    }

    function Delete(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function Edit(task) {
        setText(task.text);
        setEditId(task.id);
    }

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>
            <form onSubmit={submit} className="flex mb-4">
                <input 
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="Add a new task"
                    className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition"
                >
                    {editId ? 'Edit Task' : 'Add Task'}
                </button>
            </form>
            <ul className="space-y-2">
                {tasks.map(task => (
                    <li key={task.id} className="flex justify-between items-center p-2 bg-gray-100 rounded-lg shadow">
                        <span>{task.text}</span>
                        <div>
                            <button 
                                onClick={() => Edit(task)} 
                                className="bg-yellow-300 text-white px-2 py-1 rounded hover:bg-yellow-400 transition mr-2"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => Delete(task.id)} 
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul> 
        </div>
    );
}