// import React, { useEffect, useState } from 'react';  
// import data from './spotify_data.json';  

// function TotalPlayArt() {  
//     const [totalPlays, setTotalPlays] = useState(0);  
//     const [totalPlays, setTotalPlays] = useState({});  
//     const [selectedArtist, setSelectedArtist] = useState(null);  

//     useEffect(() => {  
//         const numOfSongs = data.filter(song => song.episode_name === null).length;  
//         setTotalPlays(numOfSongs);  

//         const numOfSong = data.reduce((acc, song) => {  
//             const artistName = song.master_metadata_album_artist_name;  
//             if (song.episode_name === null) {  
//                 acc[artistName] = (acc[artistName] || 0) + 1;  
//             }  
//             return acc;  
//         }, {});  

//         setTotalPlays(numOfSong);  
//     }, []);  

//     const handleArtistClick = (artist) => {  
//         if (selectedArtist === artist) {  
//             setSelectedArtist(null);  
//         } else {  
//             setSelectedArtist(artist);  
//         }  
//     };  

//     return (  
//         <div>  
//             <p>Total Plays: {totalPlays}</p>  
//             <h3>Songs by Artist:</h3>  
//             <ul>  
//                 {Object.entries(totalPlays).map(([artist, count]) => (  
//                     <li key={artist} onClick={() => handleArtistClick(artist)} style={{ cursor: 'pointer' }}>  
//                         {artist}  
//                         {selectedArtist === artist && <span>: {count} song</span>}  
//                     </li>  
//                 ))}  
//             </ul>  
//         </div>  
//     );  
// }  

// export default TotalPlayArt;
import React, { useEffect, useState } from 'react';  
import data from './spotify_data.json';  

function TotalPlayArt() {  
    const [totalPlays, setTotalPlays] = useState({});  

    useEffect(() => {   
        const numOfSongs = data.reduce((acc, song) => {  
            const artistName = song.master_metadata_album_artist_name;  
            if (song.episode_name === null) {  
                acc[artistName] = (acc[artistName] || 0) + 1;  
            }  
            return acc;  
        }, {});  

        setTotalPlays(numOfSongs);  
    }, []);  

    return (  
        <div>  
            <h3>Num Of Songs:</h3>  
            <ul>  
                {Object.entries(totalPlays).map(([artist, count]) => (  
                    <li key={artist}>{artist}: {count} Song</li>  
                ))}  
            </ul>  
        </div>  
    );  
}  

export default TotalPlayArt;