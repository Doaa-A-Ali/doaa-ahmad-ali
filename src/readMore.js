// import React, {useState} from 'react'

// function ReadMore({text}) {
//     const[read, setReadMore] = useState(false);

//     const words = text.split(' ');
//     const shortText = words.slice(0, 11).join(' ');
//     const fullText = words.join(' ');

//     const btn =() =>{
//         setReadMore (!read);
//     }
  
//   return (
//     <div className="m-4 p-4 bg-gray-100 rounded">
//       <p className="text-lg">
//         {!read && (<button
//             className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//             onClick={() => setReadMore(!read)}
//           >
//             {read ? 'Read Less' : 'Read More'}
//           </button>
//         )}
//       </p>
//     </div>
//   )
// }

// export default ReadMore
import React, { useState } from 'react';  



function ReadMore({ text, initialWordCount = 11 }) {  
    const [read, setReadMore] = useState(false);  

    const words = text.split(' ');  
    const shortText = words.slice(0, initialWordCount).join(' ');  
    const fullText = words.join(' ');  

    const btn = () => {  
        setReadMore(!read);  
    };  
  
    return (  
        <div className="m-4 p-4 bg-gray-100 rounded">  
            <p className="text-lg">  
                {read ? fullText : shortText}  
                <button  
                    className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"  
                    onClick={btn}  
                    
                >  
                    {read ? 'Read Less' : 'Read More'}  
                </button>  
            </p>  
        </div>  
    );  
}  

export default ReadMore;