const express = require("express");
const router = express.Router();
const Calendar = require("./Calendar");

router.post("/calendar", async (req, res) => {
  try {
    const { day} = req.body;
    const calendar = await Calendar.create({ day });
    res.json(calendar);
  } catch (error) {
    console.error("Error creating calendar entry:", error);
    res.status(500).json({ error: "Error creating calendar entry" });
  }
});

router.get("/calendar", async (req, res) => {
  try {
    const calendars = await Calendar.findAll();
    res.json(calendars);
  } catch (error) {
    console.error("Error retrieving calendar entries:", error);
    res.status(500).json({ error: "Error retrieving calendar entries" });
  }
});

module.exports = router;
