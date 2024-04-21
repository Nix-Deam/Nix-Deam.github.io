import { useState, useEffect } from "react";
import fData from "./assets/scripts/fileRead.js";
import "./App.css";
import BasicTable from "./assets/scripts/table.jsx";

function App() {
	// const [artistCounts, setArtistCounts] = useState({});

	// useEffect(() => {
	// 	const artists = fData.getTrackArtists();
	// 	const counts = {};
	// 	artists.forEach((artist) => {
	// 		counts[artist] = (counts[artist] || 0) + 1;
	// 	});
	// 	setArtistCounts(counts);
	// }, []);

	return (
		<>
			<div>
				<h1>Spotify Data</h1>
				<h2>Welcome: {fData.getUserName()}</h2>
				<div>
					<BasicTable />
				</div>
			</div>
		</>
	);
}

export default App;
