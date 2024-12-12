const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sensorDataSchema = new Schema({
  glacialId: {
    type: Schema.Types.ObjectId,
    ref: "GlacialLake",
  },
  articTern: {
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
    windDirection: {
      type: "String",
      required: true,
    },
    altitude: {
      type: "Number",
      required: true,
    },
    humidity: {
      type: "Number",
      required: true,
    },
    co2Level: {
      type: "Number",
      required: true,
    },
  },
  penguin: {
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
    groundTemperature: {
      type: "Number",
      required: true,
    },
    groundComposition: {
      type: "Number",
      required: true
    },
  },
  eel: {
    damPressure: {
      type: "Number",
      required: true,
    },
    morainePressure: {
      type: "Number",
      required: true,
    },
    groundPressure: {
      type: "Number",
      required: true,
    },
    phValue: {
      type: "Number",
      required: true,
    },
    iceThickness: {
      type: "Number",
      required: true,
    },
    soilTemperature: {
      type: "Number",
      required: true,
    },
    soilMoisture: {
      type: "Number",
      required: true
    },   
  },
  otherFactor: {
    rainfallIntensity: {
      type: "Number", 
      required: true,
    },
    snowfall: {
      type: "Number",
      required: true,
    },
    precipitation: {
      type: "Number",
      required: true,
    },
    iceMeltRate: {
      type: "Number",
      required: true, 
    },
    landslideRisk: {
      type: "String",
      required: true, 
    },
    avalancheRisk: {
      type: "String",
      required: true,
    },
    earthquakeRisk: {
      type: "String",
      required: true,
    }
  },
  alertLevel: {
    type: "Number",
    required: true,
    min: 1,
    max: 5,
  },
  alertType: {
    type: "String",
    required: true,
  },
  observationNotes: {
    type: "String", 
    required: true,
  },
  recordedAt: {
    type: "Date",
    // default: Date.now(),
    required: true,
  },
});

const SensorData = mongoose.model("sensorData", sensorDataSchema);
module.exports = SensorData;
