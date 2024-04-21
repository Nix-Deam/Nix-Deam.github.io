import { useState, useEffect } from "react";
import fData from "./assets/scripts/fileRead.js";
import "./App.css";
import BasicTable from "./assets/scripts/table.jsx";

function App() {
	const [artistCounts, setArtistCounts] = useState({});

	useEffect(() => {
		const artists = fData.getTrackArtists();
		const counts = {};
		artists.forEach((artist) => {
			counts[artist] = (counts[artist] || 0) + 1;
		});
		setArtistCounts(counts);
	}, []);

	return (
		<>
			<div>
				<h1>Spotify Data</h1>
				<h2>Welcome: {fData.getUserName()}</h2>
				<div>
					<BasicTable />
					{/* <ul>
						{Object.entries(artistCounts)
							.sort((a, b) => b[1] - a[1])
							.map(([artist, count], index) => (
								<li key={index}>
									{artist}: {count}
									<ul>
										{[...new Set(fData.getArtistTracks(artist))]
											.sort((a, b) => {
												const timeA = fData.getTrackTimeUnique(a);
												const timeB = fData.getTrackTimeUnique(b);
												const durationA = timeA[0] * 60 + timeA[1]; // Convert to minutes
												const durationB = timeB[0] * 60 + timeB[1]; // Convert to minutes
												return durationB - durationA;
											})
											.map((track, index) => {
												const time = fData.getTrackTimeUnique(track);
												const timeWithoutLastElement = time.slice(0, -1);
												const trackUri = fData.getTrackUri(track); // Assuming this function exists
												return (
													<li key={index}>
														<a
															href={trackUri}
															target="_blank"
															rel="noopener noreferrer"
														>
															{track}
														</a>
														- Play Time: {timeWithoutLastElement.join(":")}
													</li>
												);
											})}
									</ul>
								</li>
							))}
					</ul> */}
				</div>
			</div>
		</>
	);
}

export default App;
