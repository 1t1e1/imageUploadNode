const fs = require("fs");
const path = require("path");

var pathOfDir = path.join(__dirname, "..", "/images");
var Logs = [];
function readDirectory(callback) {
    fs.readdir(pathOfDir, function(err, files) {
        if (err) {
            console.log(err.message);
        } else {
            Logs.push(files);
            callback(Logs);
        }
    });
}
exports.readDirectory = readDirectory;
