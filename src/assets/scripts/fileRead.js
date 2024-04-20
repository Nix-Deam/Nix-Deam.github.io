let jsonFile=require('./Streaming_History.json');
// console.log(jsonFile);

let sum=0;
let trackNames=[];
let trackArtists=[];
let trackAlbums=[];
let trackURLs=[];
let userName='';

for(let i=0;i<jsonFile.length;i++){
    sum+=jsonFile[i].ms_played;
    trackNames.push(jsonFile[i].master_metadata_track_name);
    trackArtists.push(jsonFile[i].master_metadata_album_artist_name);
    trackAlbums.push(jsonFile[i].master_metadata_album_album_name);
    trackURLs.push(jsonFile[i].spotify_track_uri);
    userName=jsonFile[i].username;
}
let secTot=sum/1000; //convert to seconds
let minTot=secTot/60; //convert to minutes
let hrTot=minTot/60; //convert to hours

console.log('User: '+userName);
console.log('Total time listened: '+hrTot+' hours');
console.log('Total tracks listened: '+jsonFile.length);
console.log('Total unique tracks listened: '+new Set(trackNames).size); //Some tracks have the same names but are different tracks
console.log('Total unique artists listened: '+new Set(trackArtists).size);
console.log('Total unique albums listened: '+new Set(trackAlbums).size);
console.log('Total unique URLs listened: '+new Set(trackURLs).size); //Each trackURL is unique and will not be repeated