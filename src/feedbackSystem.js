import React, { useState } from 'react';  

const FeedbackSystem = () => {  
    const [feedbackInput, setFeedbackInput] = useState('');  
    const [feedbackList, setFeedbackList] = useState([]);  
    const [editId, setEditId] = useState(null); 

    const addFeedback = () => {  
        if (editId) {  
            const updatedFeedbackList = feedbackList.map(feedback =>   
                feedback.id === editId ? { ...feedback, text: feedbackInput } : feedback  
            );  
            setFeedbackList(updatedFeedbackList);  
            setEditId(null); 
        } else {  
            const newFeedback = {  
                id: Date.now(),  
                text: feedbackInput,  
            };  
            setFeedbackList([...feedbackList, newFeedback]);  
        }  
        setFeedbackInput('');   
    };  

    const deleteFeedback = (id) => {  
        const filteredFeedbackList = feedbackList.filter(feedback => feedback.id !== id);  
        setFeedbackList(filteredFeedbackList);  
    };  

    const initiateEdit = (feedback) => {  
        setFeedbackInput(feedback.text);  
        setEditId(feedback.id);  
    };  

    return (  
        <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">  
            <h1 className="text-2xl font-bold text-center mb-4">User Feedback System</h1>  
            <div className="flex flex-col space-y-4">  
                <textarea  
                    value={feedbackInput}  
                    onChange={(e) => setFeedbackInput(e.target.value)}  
                    placeholder="Enter your feedback"  
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  
                    rows="4"  
                />  
                <button  
                    onClick={addFeedback}  
                    className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-indigo-300"  
                >  
                    {editId ? 'Update Feedback' : 'Add Feedback'}  
                </button>  
            </div>  

            <h2 className="text-xl font-semibold mt-4">Feedback List</h2>  
            <ul className="border border-gray-300 mt-2 divide-y">  
                {feedbackList.map(feedback => (  
                    <li key={feedback.id} className="flex justify-between items-center p-2">  
                        <span>{feedback.text}</span>  
                        <div>  
                            <button   
                                onClick={() => initiateEdit(feedback)}   
                                className="bg-sky-300 text-white px-2 py-1 rounded hover:bg-sky-600 transition mr-2"  
                            >  
                                Edit  
                            </button>  
                            <button  
                                onClick={() => deleteFeedback(feedback.id)}  
                                className="bg-red-400 text-white px-2 py-1 rounded hover:bg-red-600"  
                            >  
                                Delete  
                            </button>  
                        </div>  
                    </li>  
                ))}  
            </ul>  
        </div>  
    );  
};  

export default FeedbackSystem;