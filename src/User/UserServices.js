const User = require("./User");
const bcrypt = require("bcrypt");
const {generateAuthToken} = require("../shared/generateAuthToken");


const create = async (body) => {
  const { username, email, password, phone } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, phone, password: hashedPassword });
  const token = generateAuthToken(user);

  return { user, token };
};

const findByEmail = async (email) => {
  return await User.findOne({ where: { email: email } });
};

module.exports = {
  create,
  findByEmail,
};
