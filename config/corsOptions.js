//Cors - CROSS ORIGIN RESOURCE SHARING
//Allowed domains that can access backend
const allowedOrigins = require("./allowedOrigins");

const coreOrigin = {
  origin: (origin, callback) => {
    //If domain is not in  allowedOrigins list
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      //Yes, that's the allwed origin set to true.
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccesStatus: 200,
};

module.exports = coreOrigin;
