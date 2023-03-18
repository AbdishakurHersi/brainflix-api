// add dependencies
const express = require("express");
const cors = require("cors");
const videoRoutes = require("./routes/videos");
// create an instance of express
const app = express();
require("dotenv").config();
let { CLIENT_URL, PORT } = process.env;
PORT = PORT || 8080;

// Middleware
app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

//define routes
app.use("/", videoRoutes);
app.use(express.static("./public/images"));
// bootstrap the server
app.listen(PORT, function () {
  console.log("the server is running on port ", PORT);
});
