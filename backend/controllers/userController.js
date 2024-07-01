const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { encryptPassword, comparePassword } = require("../helpers/encryptor");

const jwtSecret = process.env.JWT_SECRET;
const expiresIn = "1h";

const registerUser = async (req, res) => {
  const { username, password, email, role } = req.body;

  // Checking if user exists
  let userExists;
  try {
    userExists = await User.findOne({ username });
  } catch (error) {
    return res.status(400).send({
      message: error,
    });
  }

  if (userExists) {
    return res.status(409).send({ message: "Username already exists!" });
  }

  if (!email) {
    return res.status(400).send({ message: "Email is required!" });
  }

  // Hashing the password
  const hashedPassword = await encryptPassword(password);

  // Proceed to creation of user
  let createdUser;
  try {
    createdUser = await User.create({
      username,
      hashedPassword,
      email,
      role: role || "ADMIN", //Deafult
    });
  } catch (error) {
    return res.status(400).send({
      message: error,
    });
  }

  // Token creation mechanism
  let token;
  try {
    token = jwt.sign(
      {
        username: createdUser.username,
        email: createdUser.email,
        role: createdUser.role,
      },
      jwtSecret,
      { expiresIn }
    );
  } catch (error) {
    return res.status(400).send({
      message: error,
    });
  }

  return res.status(200).send({
    message: "User registered",
    data: {
      username: createdUser.username,
      email: createdUser.email,
      role: createdUser.role,
      token,
    },
  });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Checking if user exists
  let userExists;
  try {
    userExists = await User.findOne({ username });
  } catch (error) {
    return res.status(400).send({
      message: error,
    });
  }

  if (!userExists) {
    return res
      .status(400)
      .send({ message: `A user with ${username} not found` });
  }

  const isPasswordMatches = comparePassword(
    password,
    userExists.hashedPassword
  );

  if (!isPasswordMatches)
    return res.status(400).send({ message: `Invalid password` });

  // Creating token
  let token;
  try {
    token = jwt.sign(
      {
        username: userExists.username,
        email: userExists.email,
        role: userExists.role,
      },
      jwtSecret,
      { expiresIn }
    );
  } catch (error) {
    return res.status(400).send({
      message: error,
    });
  }

  return res.status(200).send({
    message: "User logged",
    data: {
      username: userExists.username,
      email: userExists.email,
      role: userExists.role,
      token,
    },
  });
};

const getUserList = async (req, res) => {
  try {
    const users = await User.find({});

    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserList,
};
