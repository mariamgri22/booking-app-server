const express = require("express");
const router = express.Router();
const CreatedService = require("./CreatedServiceServices");

router.post("/createService", CreatedService.createService);

module.exports = router;
