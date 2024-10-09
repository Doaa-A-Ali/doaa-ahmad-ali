import React, { useEffect, useState } from 'react';  
import data from './spotify_data.json';  

function TimeListening() {  
    const [time, setTime] = useState(0);  
    const [coordinatedTime, setCoordinatedTime] = useState('');  

    useEffect(() => {  

        if (Array.isArray(data)) {  
            const totalTime = data.reduce((acc, item) => {  
                return acc + (item.ms_played || 0); 
            }, 0);  

            setTime(totalTime);  

            const hour = Math.floor(totalTime / (1000 * 60 * 60));  
            const minute = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));  
            const second = Math.floor((totalTime % (1000 * 60)) / 1000);  


            setCoordinatedTime(`${hour}:${minute}:${second}`);  
        } else {  
            alert("Data is not an array");  
            setCoordinatedTime('00:00:00');  
        }  
    }, []);  

    return (  
        <div>  
            <p>Total Time: {coordinatedTime}</p>  
        </div>  
    );  
}  

export default TimeListening;  