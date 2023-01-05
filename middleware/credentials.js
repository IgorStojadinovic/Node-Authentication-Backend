const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  //Check if header.origin is in Cores Allowed Origins
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.headers("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
