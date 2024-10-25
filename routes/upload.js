const express = require("express");
const { upload, uploadImage } = require("../controllers/uploadController");

const router = express.Router();

// /api/upload
router.post("/", (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    uploadImage(req, res);
  });
});


module.exports = router;
