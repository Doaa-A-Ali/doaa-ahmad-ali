// import React, {useEffect, useState} from 'react';  
// import data from './spotify_data.json';  

// function DiffTracks() {
//     const [totalTracks, setTotalTracks] = useState(0);

//     useEffect(() => {
//         const numOfTracks = new Set();

//         data.forEach(element => {
//             if(element.episode_name === null){
//                 numOfTracks.add(element.master_metadata_track_name);
//             }
//         });

//     setTotalTracks(numOfTracks.size);  
//     }, []);
//     return (  
//     <div>
//         <p>Total Tracks {totalTracks}</p>  
//     </div>  
//     );  
// }  

// export default DiffTracks; 

import React, { useEffect, useState } from 'react';  
import data from './spotify_data.json';  

function TotalPlayArt() {  
    const [totalTracks, setTotalTracks] = useState({});  

    useEffect(() => {   
        const numOfTracks = data.reduce((acc, song) => {  
            const artistName = song.master_metadata_album_artist_name;  
            const songTitle = song.master_metadata_track_name;   
            
            if (song.episode_name === null) {  
                if (!acc[artistName]) {  
                    acc[artistName] = new Set(); 
                }  
                acc[artistName].add(songTitle);  
            }  
            return acc;  
        }, {});  

        const trackResult = Object.fromEntries(  
            Object.entries(numOfTracks).map(([artist, songsSet]) => [artist, songsSet.size])  
        );  

        setTotalTracks(trackResult);  
    }, []);  

    return (  
        <div>  
            <h3>عدد الأغاني المختلفة لكل فنان:</h3>  
            <ul>  
                {Object.entries(totalTracks).map(([artist, count]) => (  
                    <li key={artist}>{artist}: {count} Songs</li>  
                ))}  
            </ul>  
        </div>  
    );  
}  

export default TotalPlayArt;