const Calendar = require("../Calenadar/Calendar");
const User = require("../User/User");
const Service = require("./Service");

const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAndCountAll({
      include: [
        {
          model: Calendar,
          as: "Calendar",
          attributes: ["id", "day", "hours"],
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "email", "password"],
        },
      ],
    });
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);

    res.status(500).json({ error: "Failed to fetch services" });
  }
};
const getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);

    res.status(500).json({ error: "Failed to fetch services" });
  }
};

const createJustService = async (req, res) => {
  try {
    const { id, description, price, duration, category } = req.body;
    const service = await Service.create({
      id,
      description,
      price,
      duration,
      category,
    });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: "Failed to create service" });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    await service.destroy();

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete service" });
  }
};

const getServiceById = async (req, res) => {
  const serviceId = req.params.id;

  try {
    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    return res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllServices,
  createJustService,
  deleteService,
  getServices,
  getServiceById
};
