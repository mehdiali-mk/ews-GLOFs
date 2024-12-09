const mongoose = require("mongoose")
const Glacial = require("../model/glacialLakeMasterEntry");
const SensorData = require("../model/sensorData")
const glacialInitData = require("./glacialMainEntryData");
const generateRandomDataForNovember = require("../Data/generateRandomDataNovember")

const MONGOOSE_URL = "mongodb://127.0.0.1:27017/glaciers";

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

const initDatabase = async () => {
    await Glacial.deleteMany({});
    await Glacial.insertMany(glacialInitData.data);
    console.log("Data has been initilized...");
};

const initDataForGlacierDatabase = async () => {
  const glacierData = await Glacial.find({})
  console.log(glacierData)
  let allGlacierDataNovember = []
  // console.log(glacierData)
  // allGlacierDataNovember.push(...generateRandomDataForNovember(glacierData[0]._id.toHexString()))
  // $.merge(allGlacierDataNovember, generateRandomDataForNovember(glacierData[0]._id.toHexString()))
  // console.log(allGlacierDataNovember)
  // console.log(allGlacierDataNovember)
  for (glacierIndex in glacierData) {
    // console.log(glacierData[glacierIndex]._id.toHexString())
    allGlacierDataNovember.push(...generateRandomDataForNovember(glacierData[glacierIndex]._id.toHexString()))
  }

  await SensorData.deleteMany({});
  await SensorData.insertMany(allGlacierDataNovember)

  // console.log(allGlacierDataNovember)
}

// initDatabase();
initDataForGlacierDatabase();