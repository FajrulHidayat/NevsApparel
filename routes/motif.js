const express = require("express");
const { motif } = require("../app/controllers");

const router = express.Router();
router.post("/", motif.uploadImage);
router.get("/all", motif.getAllMotif);
router.get("/allByMotif", motif.getAllMotifbyMotif);
router.get("/findByIdDesign/:idDesign", motif.getMotifbyidDesign);

module.exports = router;
