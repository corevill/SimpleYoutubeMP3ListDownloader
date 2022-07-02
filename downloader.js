var YoutubeMp3Downloader = require("youtube-mp3-downloader");

var Downloader = function() {

    var self = this;
    
    //Configure YoutubeMp3Downloader with your settings
    self.YD = new YoutubeMp3Downloader({
        "ffmpegPath": "C:\\workspace\\SimpleYoutubeMP3Downloader\\ffmpeg\\bin\\ffmpeg.exe",        // FFmpeg binary location
        "outputPath": "C:\\workspace\\SimpleYoutubeMP3Downloader\\mp3",    // Output file location (default: the home directory)
        "youtubeVideoQuality": "lowest",  // Desired video quality (default: highestaudio)
        "queueParallelism": 1,                  // Download parallelism (default: 1)
        "progressTimeout": 4000,                 // Interval in ms for the progress reports (default: 1000)
        "outputOptions" : ["-af", "silenceremove=1:0:-50dB"] // Additional output options passend to ffmpeg
    });

    self.callbacks = {};

    self.YD.on("finished", function(error, data) {
        if (self.callbacks[data.videoId]) { 
            self.callbacks[data.videoId](error, data);
        } else {
            console.log("Error: No callback for videoId!");
        }
    
    });

    self.YD.on("error", function(error, data) { 

        console.log(error);
    
        if (data != null && self.callbacks[data.videoId]) { 
            self.callbacks[data.videoId](error, data);
        } else {
            console.log("Error: No callback for videoId!");
        }
     
    });

    self.YD.on("progress", function(video) {
	
        console.log("\r Progress[" + video.videoId + "] : " + video.progress.percentage); 
    });

    self.YD.on("queueSize", function(total) {
	
        console.log("Total Queue Size: " + total);
     
    }); 

};

Downloader.prototype.getMP3 = function(track, callback) {

    var self = this;
	
    // Register callback
    self.callbacks[track.videoId] = callback;
    // Trigger download
    self.YD.download(track.videoId, track.name); 
};

module.exports = Downloader;