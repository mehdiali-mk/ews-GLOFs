const roundToTwoDecimals = (num) => {
  return Math.round(num * 100) / 100;
};

const generatePenguinData = () => {
  const minWaterLevel = 20;
  const maxWaterLevel = 50;
  const minWaterTemperature = 2;
  const maxWaterTemperature = 6;
  const minWaterFlowRate = 5;
  const maxWaterFlowRate = 50;

  let waterLevel =
    Math.random() * (maxWaterLevel - minWaterLevel) + minWaterLevel;

  let waterTemperature =
    Math.random() * (maxWaterTemperature - minWaterTemperature) +
    minWaterTemperature;

  let waterFlowRate =
    Math.random() * (maxWaterFlowRate - minWaterFlowRate) + minWaterFlowRate;

  return [
    roundToTwoDecimals(waterLevel),
    roundToTwoDecimals(waterTemperature),
    roundToTwoDecimals(waterFlowRate),
  ];
};

module.exports = generatePenguinData;
