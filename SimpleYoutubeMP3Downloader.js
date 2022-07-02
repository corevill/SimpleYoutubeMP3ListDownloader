var Downloader = require("./downloader");
var dl = new Downloader();
var i = 0;

console.log("Simple Youtube MP3 Downloader!");

const canciones = [
    {videoId: "ID_YOUTUBE", name: "MI_CANCION.mp3"}
];
var i = 0;

canciones.forEach(cancion => {
    console.log("DESCARGAR DE CANCIÓN: " + cancion.name )
    dl.getMP3(cancion, function(err,res) {  
        i++;
        if(err)
            throw err;
        else{
            console.log("Song "+ i + " was downloaded: " + res.file);
        }
    })
});