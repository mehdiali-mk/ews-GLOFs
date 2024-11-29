const express = require("express");
const app = express();
const PORT = "8088";
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// Schema Variables Models
const Glacial = require("./models/glacialLakeMasterEntry");
const SensorData = require("./models/sensorData");

// Connecting to the database.
const MONGOOSE_URL = "mongodb://127.0.0.1:27017/glof";

// Requiring penguinData.
const penguinData = require("./Data/penguinData.js");

console.log(penguinData());

main()
  .then(() => {
    console.log("Database is connected...");
  })
  .catch((error) => {
    console.log(error.message);
  });

async function main() {
  await mongoose.connect(MONGOOSE_URL);
}

app.set("view engine", "ejs");
app.set("/views", path.join(__dirname + "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname + "/public")));

app.get("/", (request, response) => {
  response.render("home.ejs");
});

app.get("/about", (request, response) => {
  response.render("about.ejs");
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
