const express = require("express");
const { motif } = require("../app/controllers");

const router = express.Router();
router.post("/", motif.uploadImage);

module.exports = router;
