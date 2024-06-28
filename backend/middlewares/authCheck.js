const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  if (!req.headers["authorization"])
    return res.status(404).send({
      message: "Token not found!",
      description: "Specify a token in req.headers -> Authorization",
    });

  const token = req.headers["authorization"].split(" ")[1];

  // Decoding the token
  let payload;
  try {
    payload = jwt.verify(token, jwtSecret);
    console.log(payload);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error });
  }

  if (!(payload.role === "ADMIN")) {
    return res.status(401).send({
      message: "You are unnautharized to perform this!",
    });
  }

  next();
};

const isManager = (req, res, next) => {
  if (!req.headers["authorization"])
    return res.status(404).send({
      message: "Token not found!",
      description: "Specify a token in req.headers -> Authorization",
    });

  const token = req.headers["authorization"].split(" ")[1];

  // Decoding the token
  let payload;
  try {
    payload = jwt.verify(token, jwtSecret);

    console.log(payload);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error });
  }

  if (!(payload.role === "MANAGER" || "ADMIN")) {
    return res.status(401).send({
      message: "You are unnautharized to perform this!",
    });
  }

  next();
};

const isIntern = (req, res, next) => {
  if (!req.headers["authorization"])
    return res.status(404).send({
      message: "Token not found!",
      description: "Specify a token in req.headers -> Authorization",
    });

  const token = req.headers["authorization"].split(" ")[1];

  // Decoding the token
  let payload;
  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error });
  }

  if (!(payload.role === "INTERN" || "MANAGER" || "ADMIN")) {
    return res.status(401).send({
      message: "You are unnautharized to perform this!",
    });
  }

  next();
};

module.exports = {
  isAdmin,
  isIntern,
  isManager,
};
