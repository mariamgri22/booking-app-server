const Calendar = require("../Calenadar/Calendar");
const User = require("../User/User");
const CreatedService = require("./CreatedService");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../shared/generateAuthToken");
const dotenv = require("dotenv");
dotenv.config();
const TelegramBot = require("node-telegram-bot-api");
const Service = require("../Service/Service");
const AvailableHours = require("../AvailableHours/AvailableHours");

const bot = new TelegramBot(process.env.TELEGRAM_API, {
  polling: false,
});
const createService = async (req, res) => {
  try {
    const { description, price, duration, day, hour } = req.body;

    const calendar = await Calendar.findOne({
      where: { day },
    });

    if (!calendar) {
      return res.status(404).json({ error: "Calendar entry not found" });
    }

    const justService = await Service.findOne({
      where: { description, price, duration },
    });

    if (!justService) {
      return res.status(404).json({ error: "Service entry not found" });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    console.log(decodedToken);
    const user = await User.findByPk(decodedToken.id.id);

    const availableHours = await AvailableHours.findOne({
      where: { calendarId: calendar.id },
    });

    if (!availableHours) {
      return res.status(404).json({ error: "Available hours not found" });
    }

    const selectedHourIndex = availableHours.hours.indexOf(hour);

    if (selectedHourIndex === -1) {
      return res.status(400).json({ error: "Selected hour is not available" });
    }

    const service = await CreatedService.create({
      serviceId: justService.id,
      calendarId: calendar.id,
      userId: user.id,
      hour: hour,
    });

    availableHours.hours.splice(selectedHourIndex, 1);

    await AvailableHours.update(
      { hours: availableHours.hours },
      { where: { id: availableHours.id } }
    );
    console.log("🚀 ~ file: CreatedServiceServices.js:64 ~ createService ~ availableHours:", availableHours)

    const userRecord = await User.findByPk(user.id);
    const { username, email } = userRecord;

    const message = `New service created:\nDescription: ${description}\nPrice:Hour ${hour}\n${price}\nUsername: ${username}\nEmail: ${email}`;
    const chatId = process.env.CHATID;
    bot.sendMessage(chatId, message);

    res.json(service);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create service" });
  }
};

module.exports = {
  createService,
};
