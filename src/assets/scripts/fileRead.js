// import jsonFile from "./Streaming_History.json";
// console.log(jsonFile);

let sum = 0;
let trackNames = [];
let trackArtists = [];
let trackAlbums = [];
let trackURLs = [];
let userName = "";
let timePlayedAt = [];
// console.log('User: '+userName);
// console.log('Total time listened: '+hrTot+' hours');
// console.log('Total tracks listened: '+jsonFile.length);
// console.log('Total unique tracks listened: '+new Set(trackNames).size); //Some tracks have the same names but are different tracks
// console.log('Total unique artists listened: '+new Set(trackArtists).size);
// console.log('Total unique albums listened: '+new Set(trackAlbums).size);
// console.log('Total unique URLs listened: '+new Set(trackURLs).size); //Each trackURL is unique and will not be repeated

let uniqueTrackArtists = new Set(trackArtists);
// console.log(uniqueTrackArtists)

function fileInfo() {
	let jsonFile;
	return {
		setFile: function (jsonContent) {
			let jsonFile = jsonContent;
			for (let i = 0; i < jsonFile.length; i++) {
				sum += jsonFile[i].ms_played;
				timePlayedAt.push(jsonFile[i].ts);
				trackNames.push(jsonFile[i].master_metadata_track_name);
				trackArtists.push(jsonFile[i].master_metadata_album_artist_name);
				trackAlbums.push(jsonFile[i].master_metadata_album_album_name);
				trackURLs.push(jsonFile[i].spotify_track_uri);
				userName = jsonFile[i].username;
			}
		},
		getUserName: function () {
			return userName;
		},
		getTotalTime: function () {
			let time = [];
			time.push(hrF);
			time.push(minF);
			time.push(secF);
			time.push(msF);
			return time;
		},
		getTotalTracks: function () {
			return jsonFile.length;
		},
		getTrackNames: function () {
			return trackNames;
		},
		getTrackUrl: function () {
			return trackURLs;
		},
		getTrackAlbums: function () {
			return trackAlbums;
		},
		getTrackArtists: function () {
			return trackArtists;
		},
		getTrackTimeUnique: function (track, R) {
			let time = 0;
			for (let i = 0; i < jsonFile.length; i++) {
				if (jsonFile[i].master_metadata_track_name === track) {
					time += jsonFile[i].ms_played;
				}
			}
			let timeArr = this.convertTime(time);
			let readable = this.convertTimeReadable(timeArr);
			if (R > 0) {
				return readable;
			}
			return timeArr;
		},
		convertTime: function (time) {
			let secTot = time / 1000; //convert to seconds
			let minTot = secTot / 60; //convert to minutes
			let hrTot = minTot / 60; //convert to hours
			let hrFR = hrTot % 1; //get the decimal part of the hours
			let minF = hrFR * 60; //convert the decimal part of the hours to minutes

			let minFR = minF % 1; //get the decimal part of the minutes

			let secF = minFR * 60; //convert the decimal part of the minutes to seconds

			let secFR = secF % 1; //get the decimal part of the seconds

			let msF = secFR * 1000; //convert the decimal part of the seconds to milliseconds

			let hrF = hrTot - hrFR; //get the whole hours
			minF = minF - (minF % 1); //get the whole minutes
			secF = secF - (secF % 1); //get the whole seconds
			msF = msF - (msF % 1); //get the whole milliseconds

			let timeArr = [];
			timeArr.push(hrF);
			timeArr.push(minF);
			if (msF) {
				secF += 1;
				msF = 0;
			}
			timeArr.push(secF);
			timeArr.push(msF);
			//Returns time in an array [hours, minutes, seconds, milliseconds]
			return timeArr;
		},
		getArtistTracks: function (artist) {
			let artistTracks = [];
			for (let i = 0; i < jsonFile.length; i++) {
				if (jsonFile[i].master_metadata_album_artist_name === artist) {
					artistTracks.push(jsonFile[i].master_metadata_track_name);
				}
			}
			return artistTracks;
		},
		getTrackUri: function (track) {
			let trackUri = "";
			for (let i = 0; i < jsonFile.length; i++) {
				if (jsonFile[i].master_metadata_track_name === track) {
					trackUri = jsonFile[i].spotify_track_uri;
				}
			}
			return trackUri;
		},
		convertTimeReadable: function (time) {
			let timeString = "";
			if (time[0] > 0) {
				timeString += time[0] + "H: ";
			}
			if (time[1] > 0) {
				timeString += time[1] + "M: ";
			}
			if (time[2] > 0) {
				timeString += time[2] + "S";
			}
			if (timeString === "") {
				timeString = "Null";
			}
			return timeString;
		},
		getWhenPlayed: function () {
			return timePlayedAt;
		},
	};
}

export default fileInfo();
