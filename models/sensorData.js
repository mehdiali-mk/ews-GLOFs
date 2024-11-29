const { ref, required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sensorDataSchema = new Schema({
  glacialId: {
    type: Schema.Types.ObjectId,
    ref: "GlacialLake",
  },
  lakeSize: {
    type: "Number",
    required: true,
  },
  temperature: {
    type: "Number",
    required: true,
  },
  windSpeed: {
    type: "Number",
    required: true,
  },
  damPressure: {
    type: "Number",
    required: true,
  },
  waterLevel: {
    type: "Number",
    required: true,
  },
  waterTemperature: {
    type: "Number",
    required: true,
  },
  waterFlowRate: {
    type: "Number",
    required: true,
  },
  groundPressure: {
    type: "Number",
    required: true,
  },
});

const SensorData = mongoose.model("sensorData", sensorDataSchema);
module.exports = SensorData;
