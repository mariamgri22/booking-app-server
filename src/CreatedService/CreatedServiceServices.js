const Calendar = require("../Calenadar/Calendar");
const User = require("../User/User");
const CreatedService = require("./CreatedService");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../shared/generateAuthToken");
const dotenv = require("dotenv");
dotenv.config();
const TelegramBot = require("node-telegram-bot-api");
const Service = require("../Service/Service");

const bot = new TelegramBot(process.env.TELEGRAM_API, {
  polling: false,
});

const createService = async (req, res) => {
  try {
    const { description, price, duration, day } = req.body;

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

    const service = await CreatedService.create({
      description,
      price,
      duration,
      serviceId: justService.id,
      calendarId: calendar.id,
      userId: user.id,
    });

    const userRecord = await User.findByPk(user.id);
    const { username, email } = userRecord;

    const message = `New service created:\nDescription${description}\nprice ${price}\nUsername: ${username}\nEmail: ${email}`;
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
