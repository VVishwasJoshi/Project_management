const express = require("express");
const multer = require("multer");
// const path = require("path");
const File = require("../models/file");

const router = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const { teamId, uploadBy, body } = req.body;

  try {
    const file = await File.create({
      fileName: req.file.originalname,
      path: req.file.path,
      body,
      teamId,
      uploadBy,
    });

    res.status(201).json({ message: "File uploaded successfully", file });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading file", error: error.message });
  }
});

module.exports = router;
