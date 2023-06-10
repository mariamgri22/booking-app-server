const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString("hex");
};

const JWT_SECRET = generateJWTSecret();

const generateAuthToken = (id) => {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = {
  generateAuthToken,
  JWT_SECRET,
};
