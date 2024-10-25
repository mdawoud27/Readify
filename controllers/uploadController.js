const asyncHandler = require("express-async-handler");
const multer = require("multer");
const path = require("path");

const uploadImage = asyncHandler((req, res) => {
  res.status(200).json({
    message: "Image uploaded successfully",
    filePath: `/images/${req.file.filename}`,
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") +
        file.originalname.replace(/ /g, "_")
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB size limit
});

module.exports = {
  uploadImage,
  upload,
};
