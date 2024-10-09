import React, { useState, useEffect } from 'react';  

function Color() {  
  const initialColors = Array.from({ length: 5 }, () => generateRandomColor());  
  const [colors, setColors] = useState(initialColors);  
  const [isLocked, setIsLocked] = useState(Array(5).fill(false));  

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
    const newColors = colors.map((color, index) => {  
      return isLocked[index] ? color : generateRandomColor();  
    });  
    setColors(newColors);  
  };  

  const handleSpaceKeyPress = (event) => {  
    if (event.key === ' ') {  
      changeColor();  
    }  
  };  

  const handleClick = () => {  
    changeColor();  
  };  

  const toggleLock = (index) => {  
    setIsLocked((prev) => {  
      const newLockState = [...prev];  
      newLockState[index] = !newLockState[index];  
      return newLockState;  
    });  
  };  

  const copyToClipboard = (color) => {  
    navigator.clipboard.writeText(color).then(() => {  
      alert(`Copied ${color} to clipboard!`);  
    }).catch(err => {  
      console.error('Failed to copy: ', err);  
    });  
  };  

  useEffect(() => {  
    window.addEventListener('keydown', handleSpaceKeyPress);  
    return () => {  
      window.removeEventListener('keydown', handleSpaceKeyPress);  
    };  
  }, []);  

  return (  
    <div onClick={handleClick} style={{ cursor: 'pointer', height: '100vh' }}>  
      <div className="w-full h-full flex flex-wrap">  
        {colors.map((color, index) => (  
          <div key={index} className="w-1/5 h-1/1 relative" style={{ backgroundColor: color }}>  
            <button  
              className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white rounded ${  
                isLocked[index] ? 'bg-red-600' : 'bg-blue-600'  
              }`}  
              onClick={(e) => { e.stopPropagation(); toggleLock(index); }}  
            >  
              {isLocked[index] ? 'Unlock' : 'Lock'}  
            </button>  
            <p className="text-gray-800 text-md">{color}</p>  
            <button  
              className="absolute bottom-2 left-2 px-2 py-1 bg-gray-800 text-white rounded"  
              onClick={(e) => { e.stopPropagation(); copyToClipboard(color); }}  
            >  
              Copy  
            </button>  
          </div>  
        ))}  
      </div>  
    </div>  
  );  
}  

export default Color;