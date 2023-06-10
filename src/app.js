const express = require("express");

const UserRouter = require("./User/UserRouter");
const CalendarRouter = require("./Calenadar/CalendarRouter");
const ServiceRoutes = require("./Service/ServiceRoute");
const AvailableHoursRoutes = require("./AvailableHours/AvailableHoursRouter");
const CreatedServiceServices = require("./CreatedService/CreatedServiceRouter");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use(UserRouter);
app.use(CalendarRouter);
app.use(ServiceRoutes);
app.use(AvailableHoursRoutes);
app.use(CreatedServiceServices);

module.exports = app;
