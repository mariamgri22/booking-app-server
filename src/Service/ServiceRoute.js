const express = require("express");
const router = express.Router();
const ServiceServices = require("./ServiceSevices");

router.get("/servicesAll", ServiceServices.getAllServices);
router.get("/services", ServiceServices.getServices);

router.post("/postService", ServiceServices.createJustService);
router.delete("/services/:id", ServiceServices.deleteService);


router.get("/service/:id", ServiceServices.getServiceById);
  

module.exports = router;
