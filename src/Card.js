import React from 'react';  

const Card = ({ title, content, imageUrl }) => {  
  return (  
    <div className="bg-purple-400 w-64 h-114 rounded overflow-hidden shadow-lg m-4  ">  
    <div className='flex items-start'>

      {imageUrl && <img className="w-34 h-34   rounded-full ..." src={imageUrl} alt={title} />}  
    </div>
      <div className="px-2 py-2">  
        <div className="font-bold text-xl mb-2">{title}</div>  
        <p className="text-gray-700 text-base">{content}</p>  
      </div>  
    </div>  
  );
}; 

export default Card;