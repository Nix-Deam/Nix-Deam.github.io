import { useState, useEffect } from "react";
import fData from "./assets/scripts/fileRead.js";
import "./App.css";
import BasicTable from "./assets/scripts/table.jsx";
import JsonUpload from "./intro.jsx";

function App() {
	let userName = fData.getUserName();
	const [fileUploaded, setFileUploaded] = useState(false);

	const handleFileUpload = (file) => {
		const reader = new FileReader();

		reader.onload = (event) => {
			const fileContent = event.target.result;
			const jsonData = JSON.parse(fileContent);

			// Now jsonData contains the content of the JSON file as a JavaScript object
			// You can pass jsonData to fData.setFile or handle it as needed

			fData.setFile(jsonData);
			setFileUploaded(true);
		};

		reader.onerror = (event) => {
			console.error("File could not be read! Code " + event.target.error.code);
		};

		reader.readAsText(file);
	};

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
				{userName && <h2>Welcome: {userName}</h2>}
				<div>
					{fileUploaded ? (
						<BasicTable />
					) : (
						<JsonUpload onUpload={handleFileUpload} />
					)}
				</div>
			</div>
		</>
	);
}

export default App;
