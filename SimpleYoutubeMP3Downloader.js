var Downloader = require("./downloader");
var dl = new Downloader();
var i = 0;

console.log("Simple Youtube MP3 Downloader!");

const songs = [
    {videoId: "ID_YOUTUBE_VIDE", name: "MY_SONG.mp3"}
];
var i = 0;

songs.forEach(song => {
    dl.getMP3(song, function(err,res) {  
        i++;
        if(err)
            throw err;
        else{
            console.log("Song "+ i + " was downloaded: " + res.file);
        }
    })
});
