const express = require("express");
const app = express();
const PORT = "8088";
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// Schema Variables Models
const Glacial = require("./model/glacialLakeMasterEntry");
const SensorData = require("./model/sensorData");

// Connecting to the database.
const MONGOOSE_URL = "mongodb://127.0.0.1:27017/glaciers";

// Requiring penguinData.
const generateRandomData = require("./Data/generateRandomData.js");

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

app.get("/", async (request, response) => {
  allGlacierData = await Glacial.find({});
  console.log(allGlacierData);
  response.render("home.ejs", allGlacierData);
});

app.get("/glacier/:id", async (request, response) => {
  const { id } = request.params;

  const glacierSensorData = await SensorData.find({ glacialId: id }).sort({
    recordedAt: -1,
  });
  const glacierData = await Glacial.findById(id);
  let temperatureData = [];
  let lakeSizeData = [];
  let windSpeedData = [];
  let altitudeData = [];
  let humidityData = [];
  let co2LevelData = [];

  let waterLevelData = [];
  let waterTemperatureData = [];
  let waterFlowRateData = [];
  let groundTemperatureData = [];
  let groundCompositionData = [];

  let damPressureData = [];
  let groundPressureData = [];
  let phValueData = [];
  let iceThicknessData = [];
  let soilTemperatureData = [];
  let soilMoistureData = [];

  let rainfallIntensityData = [];
  let snowfallData = [];
  let precipitationData = [];
  let iceMeltRateData = [];
  let alertLevelData = [];

  let recordedAtData = [];

  for (glacierIndex in glacierSensorData) {
    // console.log(glacierSensorData[glacierIndex].articTern.temperature)
    lakeSizeData.push(glacierSensorData[glacierIndex].articTern.lakeSize);
    temperatureData.push(glacierSensorData[glacierIndex].articTern.temperature);
    windSpeedData.push(glacierSensorData[glacierIndex].articTern.windSpeed);
    altitudeData.push(glacierSensorData[glacierIndex].articTern.altitude / 100);
    humidityData.push(glacierSensorData[glacierIndex].articTern.humidity);
    co2LevelData.push(
      parseFloat(
        Number(glacierSensorData[glacierIndex].articTern.co2Level / 10).toFixed(
          2
        )
      )
    );

    // Penguin Data Fetch
    waterLevelData.push(glacierSensorData[glacierIndex].penguin.waterLevel);
    waterTemperatureData.push(
      glacierSensorData[glacierIndex].penguin.waterTemperature
    );
    waterFlowRateData.push(
      glacierSensorData[glacierIndex].penguin.waterFlowRate
    );
    groundTemperatureData.push(
      glacierSensorData[glacierIndex].penguin.groundTemperature
    );
    groundCompositionData.push(
      glacierSensorData[glacierIndex].penguin.groundComposition
    );

    // Eel Data Fetch.
    damPressureData.push(glacierSensorData[glacierIndex].eel.damPressure);
    groundPressureData.push(glacierSensorData[glacierIndex].eel.groundPressure);
    phValueData.push(glacierSensorData[glacierIndex].eel.phValue);
    iceThicknessData.push(glacierSensorData[glacierIndex].eel.iceThickness);
    soilTemperatureData.push(
      glacierSensorData[glacierIndex].eel.soilTemperature
    );
    soilMoistureData.push(glacierSensorData[glacierIndex].eel.soilMoisture);
    // let dateString = String(glacierSensorData[glacierIndex].recordedAt);

    rainfallIntensityData.push(
      glacierSensorData[glacierIndex].otherFactor.rainfallIntensity
    );
    snowfallData.push(glacierSensorData[glacierIndex].otherFactor.snowfall);
    precipitationData.push(
      glacierSensorData[glacierIndex].otherFactor.precipitation
    );
    iceMeltRateData.push(
      glacierSensorData[glacierIndex].otherFactor.iceMeltRate
    );
    alertLevelData.push(glacierSensorData[glacierIndex].alertLevel);

    let date = glacierSensorData[glacierIndex].recordedAt;

    // Extract year, month, and day
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is 0-based, so add 1
    let day = String(date.getDate()).padStart(2, "0");

    // Format the date as "YYYY-MM-DD"
    // let formattedDate = `${year}-${month}-${day}`;
    let formattedDate = Number(`${day}`);

    // console.log(formattedDate);  // Output: "2024-12-07"

    recordedAtData.push(formattedDate);

    // recordedAtData.push(String(glacierSensorData[glacierIndex].recordedAt))
    // console.log(typeof(String(glacierSensorData[glacierIndex].recordedAt)))
  }
  let totalEntriesLength = glacierSensorData.length;
  console.log(rainfallIntensityData, snowfallData, precipitationData, iceMeltRateData, alertLevelData);
  // console.log(glacierSensorData)
  // console.log(temperatureData)
  // console.log(glacierSensorData)
  response.render("about.ejs", {
    glacierData,
    glacierSensorData,
    id,
    temperatureData,
    totalEntriesLength,
    recordedAtData,
    lakeSizeData,
    windSpeedData,
    altitudeData,
    humidityData,
    co2LevelData,
    waterLevelData,
    waterTemperatureData,
    waterFlowRateData,
    groundTemperatureData,
    groundCompositionData,

    damPressureData,
    groundPressureData,
    phValueData,
    iceThicknessData,
    soilTemperatureData,
    soilMoistureData,

    rainfallIntensityData,
    snowfallData,
    precipitationData,
    iceMeltRateData,
    alertLevelData,
  });
});

app.post("/glacier/:id", async (request, response) => {
  const { id } = request.params;
  // console.log(id)

  const generatedData = generateRandomData(id);
  // console.log(generatedData)
  await SensorData.insertMany([generatedData]);

  response.redirect(`/glacier/${id}`);
});

app.post("/glacier/:id/date", async (request, response) => {
  const { id } = request.params;

  const calculateDate = request.body.date;

  let startDate = calculateDate.startDate;
  let endDate = calculateDate.endDate;
  endDate = addOneDay(endDate);

  if (startDate > endDate) {
    let swapDate = startDate;
    startDate = endDate;
    endDate = swapDate;
  }

  const glacierSensorData = await SensorData.find({
    glacialId: id,
    recordedAt: {
      $gte: startDate,
      $lte: endDate,
    },
  }).sort({ recordedAt: -1 });
  const glacierData = await Glacial.findById(id);

  let temperatureData = [];
  let lakeSizeData = [];
  let windSpeedData = [];
  let altitudeData = [];
  let humidityData = [];
  let co2LevelData = [];
  let recordedAtData = [];

  for (glacierIndex in glacierSensorData) {
    // console.log(glacierSensorData[glacierIndex].articTern.temperature)
    lakeSizeData.push(glacierSensorData[glacierIndex].articTern.lakeSize);
    temperatureData.push(glacierSensorData[glacierIndex].articTern.temperature);
    windSpeedData.push(glacierSensorData[glacierIndex].articTern.windSpeed);
    altitudeData.push(glacierSensorData[glacierIndex].articTern.altitude / 100);
    humidityData.push(glacierSensorData[glacierIndex].articTern.humidity);
    co2LevelData.push(
      parseFloat(
        Number(glacierSensorData[glacierIndex].articTern.co2Level / 10).toFixed(
          2
        )
      )
    );

    // let dateString = String(glacierSensorData[glacierIndex].recordedAt);

    let date = glacierSensorData[glacierIndex].recordedAt;

    // Extract year, month, and day
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is 0-based, so add 1
    let day = String(date.getDate()).padStart(2, "0");

    // Format the date as "YYYY-MM-DD"
    // let formattedDate = `${year}-${month}-${day}`;
    let formattedDate = Number(`${day}`);

    // console.log(formattedDate);  // Output: "2024-12-07"

    recordedAtData.push(formattedDate);

    // recordedAtData.push(String(glacierSensorData[glacierIndex].recordedAt))
    // console.log(typeof(String(glacierSensorData[glacierIndex].recordedAt)))
  }
  let totalEntriesLength = glacierSensorData.length;
  console.log(
    lakeSizeData,
    windSpeedData,
    altitudeData,
    humidityData,
    co2LevelData,
    recordedAtData
  );

  if (glacierSensorData.length === 0) {
    console.log(glacierSensorData);
  }
  response.render("about.ejs", {
    glacierData,
    glacierSensorData,
    id,
    temperatureData,
    totalEntriesLength,
    recordedAtData,
    lakeSizeData,
    windSpeedData,
    altitudeData,
    humidityData,
    co2LevelData,
  });
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

function addOneDay(dateString) {
  // Convert the string date to a Date object
  let date = new Date(dateString);

  // Add one day (24 hours in milliseconds)
  date.setDate(date.getDate() + 1);

  // Format the date back into a string in the same format (YYYY-MM-DD)
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0"); // month is 0-based
  let day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
