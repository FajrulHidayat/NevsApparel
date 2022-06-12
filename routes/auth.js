const express = require("express");
const { user } = require("../app/controllers");

const router = express.Router();
router.post("/registration", user.Registration);
router.post("/login", user.Login);

module.exports = router;
