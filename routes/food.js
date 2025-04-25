const express = require("express");
const { processText, processImage } = require("../controllers/foodController");

const router = express.Router();

router.post("/analyze", processText);
router.post("/analyze-image", processImage); // nuevo endpoint
module.exports = router;
