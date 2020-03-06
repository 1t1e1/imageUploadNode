const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const multer = require("multer");
const fileType = require("file-type");
const fs = require("fs");
const readDirectory = require("./src/readDirectory");
const path = require("path");
const cors = require("cors");

app.use(express.static(__dirname + "/images"));
app.use(cors());

const router = express.Router();

var upload = multer({
    dest: path.join(__dirname, "/images/"),
    fileFilter: function fileFilter(req, file, cb) {
        // To reject this file pass `false`, like so:
        // cb(null, false);

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("this format are not allowed !"), false);
        }
        // // To accept the file pass `true`, like so:
        cb(null, true);
    },
}).single("image");

router.post("/images/upload", (req, res, err) => {
    upload(req, res, err => {
        if (err) {
            res.status(400).json({ message: err.message });
        } else {
            let path = `images/${req.file.filename}`;
            res.status(200).json({
                message: "upload successfully!",
                path,
            });
            // res.send("post made on");
        }
    });
});

router.get("/images", (req, res) => {
    // files cok gonderiliyor olmasina sebebi muhtemelen readDire logfile
    readDirectory.readDirectory(function(logFiles) {
        res.json({ files: logFiles });
    });
});

router.get("/images/:imageId", (req, res) => {
    let imageId = req.params.imageId;
    let imagePath = path.join(__dirname, "/images/", imageId);
    let image = fs.readFileSync(imagePath);
    // let mime = fileType(image).mime;
    let mime = fileType.fromFile(imagePath);
    // mime.then(function(result) {
    //     console.log(result);
    // }).catch(function(err) {
    //     console.log(err);
    // });
    // // console.log(mime);

    res.writeHead(200, { "Content-Type": mime });
    res.end(image, "binary");
});

app.use("/", router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
