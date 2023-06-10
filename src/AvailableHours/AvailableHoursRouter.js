const express = require("express");
const Calendar = require("../Calenadar/Calendar");
const AvailableHours = require("./AvailableHours.js");
const router = express.Router();

router.post("/available-hours", async (req, res) => {
  const { calendarId, hours } = req.body;

  try {
    const calendar = await Calendar.findOne({ where: { id: calendarId } });
    if (!calendar) {
      return res.status(404).json({ message: "Calendar not found." });
    }

    const newAvailableHour = await AvailableHours.create({ hours, calendarId });
    res.status(201).json({ id: newAvailableHour.id, hours: hours });
  } catch (error) {
    console.error("Error creating available hour:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/available-hours/:calendarDay", async (req, res) => {
  const { calendarDay } = req.params;

  try {
    const calendar = await Calendar.findOne({ where: { day: calendarDay } });
    if (!calendar) {
      return res.status(404).json({ message: "Calendar not found." });
    }

    const availableHours = await AvailableHours.findAll({
      where: { calendarId: calendar.id },
      attributes: ["hours"], 
    });

    const hoursArray = availableHours.map((hour) => hour.hours); 

    res.status(200).json({ availableHours: hoursArray });
  } catch (error) {
    console.error("Error retrieving available hours:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
