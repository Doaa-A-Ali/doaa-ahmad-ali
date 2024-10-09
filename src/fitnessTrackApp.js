import React, { useState } from 'react';  

const FitnessTracker = () => {  
    const [activityType, setActivityType] = useState('');  
    const [time, setTime] = useState('');  
    const [steps, setSteps] = useState('');  
    const [activities, setActivities] = useState([]);  

    const dailyGoal = 60000;  

    const handleSubmit = (e) => {  
        e.preventDefault();  
        if (activityType && time && steps) {  
            setActivities(prev => [...prev, { activityType, time, steps: Number(steps) }]);  
            setActivityType('');  
            setTime('');  
            setSteps('');  
        }  
    };  

    const totalSteps = activities.reduce((acc, activity) => acc + activity.steps, 0);  

    return (  
        <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">  
            <h1 className="text-2xl font-bold text-center mb-4">Fitness Tracker</h1>  
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-4">  
                <input  
                    type="text"  
                    placeholder="Activity Type"  
                    value={activityType}  
                    onChange={(e) => setActivityType(e.target.value)}  
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  
                    required  
                />  
                <input  
                    type="number"  
                    placeholder="Time (minutes)"  
                    value={time}  
                    onChange={(e) => setTime(e.target.value)}  
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  
                    required  
                />  
                <input  
                    type="number"  
                    placeholder="Steps"  
                    value={steps}  
                    onChange={(e) => setSteps(e.target.value)}  
                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  
                    required  
                />  
                <button  
                    type="submit"  
                    className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-blue-600"  
                >  
                    Add Activity  
                </button>  
            </form>  
            <h2 className="text-xl font-semibold mt-4">Activity List</h2>  
            <ul className="list-disc pl-5 mb-4">  
                {activities.map((activity, index) => (  
                    <li key={index}>  
                        {`${activity.activityType} - ${activity.time} minutes, ${activity.steps} steps`}  
                    </li>  
                ))}  
            </ul>  
            <div className="mt-4">  
                <h2 className="text-lg font-semibold">Total Steps: {totalSteps}</h2>  
                <h3 className={totalSteps >= dailyGoal ? 'text-green-500' : 'text-red-500'}>  
                    {totalSteps >= dailyGoal ? 'Hero 🫡' : 'Keep Going'}  
                </h3>  
                <p>Daily Goal: {dailyGoal} steps</p>  
            </div>  
        </div>  
    );  
};  

export default FitnessTracker;