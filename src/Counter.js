import React, { useState, useEffect } from 'react';  

function Counter() {  
  const [count, setCount] = useState(0);  

  useEffect(() => {  
    alert('Counter component mounted');  
    const interval = setInterval(() => {  
      setCount(prevCount => prevCount + 1);  
    }, 1000);  

    return () => {  
      if(count==5){
      alert('Counter component will unmount');  
      clearInterval(interval);  
      }
    };  
  }, []); // Effect runs only once on mount  

  useEffect(() => {  
    alert('Count updated to:' + count);  
  }, [count]); // Effect runs when 'count' changes  

  return (  
    <div>  
      <h1>Count: {count}</h1>  
    </div>  
  );  
}  

export default Counter;