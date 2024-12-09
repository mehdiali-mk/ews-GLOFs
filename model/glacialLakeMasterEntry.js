const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const glacialLakeSchema = new Schema({
  glacialName: {
    type: "String",
    required: true,
  },
  glacialLongitude: {
    type: "String",
    required: true,
  },
  glacialLatitude: {
    type: "String",
    required: true,
  },
  glacialRegion: {
    type: "String",
    required: true,
  },
  glacialArea: {
    type: "String",
    required: true,
  },
  glacialAffectingArea: {
    type: [String],
    required: true,
  },
});

const Glacial = mongoose.model("GlacialLake", glacialLakeSchema);
module.exports = Glacial;
