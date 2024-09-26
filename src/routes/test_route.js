const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const Test = require("../models/test_model");

// Define the route for uploading images
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const { originalname, mimetype } = req.file;

    const image = await Test.create({
      images: [
        {
          data: req.file.buffer,
          contentType: mimetype,
          filename: originalname,
        },
      ],
    });

    return res.status(201).json(image);
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ msg: "Invalid data for image upload" });
    }

    return res.status(500).json({ msg: "Server error" });
  }
});

router.get("/fetch-all", async (req, res) => {
  try {
    const images = await Test.find();

    const formattedImages = images.map((image) => {
      const imageData = image.images[0];
      return {
        _id: image._id,
        data: imageData.data.toString("base64"), // Convert binary data to base64
        contentType: imageData.contentType,
        filename: imageData.filename,
      };
    });

    // console.log(formattedImages);

    res.json({ success: true, data: formattedImages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
