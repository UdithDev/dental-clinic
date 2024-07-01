const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { isAdmin } = require("../middlewares/authCheck");
const {
  registerUser,
  loginUser,
  getUserList,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/all", getUserList);

router.delete("/delete", [isAdmin], async (req, res) => {
  const { username } = req.query;

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
    return res.status(404).send({
      message: "User not found",
    });
  }

  const isUserDeleted = await User.deleteOne({ username });
  return isUserDeleted
    ? res.status(200).send({ message: "User is deleted!" })
    : res.status(400).send({ message: "User cannot be deleted" });
});

router.get("/test", async (req, res) => {
  res.send();
});

module.exports = router;
