const { validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.stattus(422).json({
      error: errors.array()[0].msg,
    });
  }
  next();
};
