const express = require("express");
const router = express.Router();
var multer = require("multer");
var path = require("path");
const uuid = require("uuid");

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

router.post("", upload.single("sampleFile"), function (req, res) {
  let sampleFile;
  let uploadPath;

  console.log(req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  var ext = path.extname(sampleFile.name);
  var uuid4 = uuid.v4();
  abs_path = "static/" + uuid4 + ext;
  uploadPath = process.cwd() + "/upload/" + uuid4 + ext;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    console.log(err);
    if (err) return res.status(500).send(err);
    res.send({ path: abs_path });
  });
});

module.exports = router;
