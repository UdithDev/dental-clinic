const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const encryptPassword = async (password) => {
  try {
    if (!password) return;

    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = (password, hashedPassword) => {
  try {
    if (!password || !hashedPassword) return;

    const hash = bcrypt.compareSync(password, hashedPassword);

    return hash;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  encryptPassword,
  comparePassword,
};
