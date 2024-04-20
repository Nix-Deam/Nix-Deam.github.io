import { useState, useEffect } from 'react'
import fData from './assets/scripts/fileRead.js'
import './App.css'

let a=fData.getTrackTimeUnique("Good Feeling")
console.log(a);
console.log(fData.getTrackNames());


function App() {
  const [artistCounts, setArtistCounts] = useState({});

  useEffect(() => {
    const artists = fData.getTrackArtists();
    const counts = {};
    artists.forEach(artist => {
      counts[artist] = (counts[artist] || 0) + 1;
    });
    setArtistCounts(counts);
  }, []);

  return (
    <>
      <div>
        <h1>Spotify Data</h1>
        <h2>Welcome: {fData.getUserName()}</h2>
        <ul>
          {Object.entries(artistCounts).sort((a, b) => b[1] - a[1]).map(([artist, count], index) => (
            <li key={index}>{artist}: {count}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App