import React, { useState, useEffect } from 'react';

function Color() {
    const initialColors = Array.from({ length: 5 }, () => generateRandomColor());
    const [colors, setColors] = useState(initialColors);

    function generateRandomColor() {
        const hexList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        let result = "#";
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * hexList.length);
            result += hexList[randomIndex];
        }
        return result;
    }

    const changeColor = () => {
        const newColors = Array.from({ length: 5 }, () => generateRandomColor());
        setColors(newColors);
    };

    const handleSpaceKeyPress = (event) => {
        if (event.key === ' ' ) {
            changeColor();
        }
    };

    const handleClick = () => {
        changeColor();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleSpaceKeyPress);

        return () => {
            window.removeEventListener('keydown', handleSpaceKeyPress);
        };
    }, []);

    const toggleLock = () => {
        setIsLocked(!isLocked);
      };
    
    return (
      
        <div onClick={handleClick} style={{ cursor: 'pointer', height: '100vh' }}>
            <button className='bg-gray-800' onClick={toggleLock}>{isLocked ? 'Unlock' : 'Lock Colors'}</button>
          {/* <button  style={{ cursor: 'pointer', height: '100vh' }} className="w-1/1 h-1/1"  onClick={() => window.location.reload(false)}>Click to reload!</button> */}
            <div className="w-full h-full flex flex-wrap">
                {colors.map((color, index) => (
                    <div key={index} className="w-1/5 h-1/1" style={{ backgroundColor: color }}>
                        <p className="text-gray-800 text-md">{color}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Color;