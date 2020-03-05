const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const multer = require("multer");
const fileType = require("file-type");

const router = express.Router();

var upload = multer({
    dest: "images/",
    fileFilter: function fileFilter(req, file, cb) {
        // The function should call `cb` with a boolean
        // to indicate if the file should be accepted

        // To reject this file pass `false`, like so:
        cb(null, false);

        // To accept the file pass `true`, like so:
        cb(null, true);

        // You can always pass an error if something goes wrong:
        cb(new Error("I don't have a clue!"));

        if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
            return cb(new Error("this format are not allowed !"), false);
        }

        callback(null, true);
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

router.get("/images/:imageId", (req, res) => {
    let imageId = req.params.imageId;
    let imagepath = __dirname + "/images/" + imageId;
    let image = fs.readFileSync(imagepath);
    let mime = fileType(image).mime;

    console.log("get req made");
    res.writeHead(200, { "Content-Type": mime });
    res.end(image, "binary");
});

router.get("/images", (req, res) => {
    console.log("get req made");

    res.end("it is success");
});
app.use("/", router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
