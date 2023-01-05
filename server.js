// SERVER MVC
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");

const PORT = process.env.PORT || 3500;
mongoose.set("strictQuery", false);

// Connect to Mongo DB
connectDB();

//Custom middlware logger.
app.use(logger);

//Check Cores Allowed Origins
app.use(credentials);

//Pass cors options to cors
app.use(cors(corsOptions));

//If HTML Form data is sent enable urlencoded
app.use(express.urlencoded({ extended: false }));

//Built-in middleware for json
app.use(express.json());

//Middleware for cookies
app.use(cookieParser());

//Built-in middleware for serving static files
app.use(express.static(path.join(__dirname, "/public")));

//Routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

//Everything after this line will use verifyJWT middleware
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));
app.use("/users", require("./routes/api/users"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
app.use(errorHandler);

//Only listen for request if connection to MongoDB is established.
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
});
