const mongoose = require("mongoose")
const Glacial = require("../models/glacialLakeMasterEntry");
const glacialInitData = require("./glacialMainEntryData");

const MONGOOSE_URL = "mongodb://127.0.0.1:27017/pops";

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

initDatabase();