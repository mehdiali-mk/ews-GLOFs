const generateObservationNotes = (
  alertLevel,
  alertType,
  temperature,
  waterFlowRate,
  iceThickness,
  windSpeed,
  snowfall,
  rainfallIntensity
) => {
  const observationNotes = [];

  // Basic info
  observationNotes.push(
    `Temperature: ${temperature.toFixed(
      1
    )}°C, Water Flow Rate: ${waterFlowRate.toFixed(2)} m³/s`
  );

  // Alert level specific messages
  if (alertLevel === 5) {
    observationNotes.push(
      "Critical alert level! Immediate action required due to extreme conditions."
    );
    observationNotes.push(
      "The glacier is at risk of a GLOF due to high water flow and rapid ice melt."
    );
  } else if (alertLevel === 4) {
    observationNotes.push(
      "High risk! Monitor closely. Unstable glacier conditions detected."
    );
    observationNotes.push(
      "Water levels and ice thickness are showing alarming signs of instability."
    );
  } else if (alertLevel === 3) {
    observationNotes.push("Moderate risk. Increased observation recommended.");
    observationNotes.push(
      "Temperatures and water flow rates are trending higher. Potential risk of flooding."
    );
  } else if (alertLevel === 2) {
    observationNotes.push("Low risk. Routine surveillance is advised.");
    observationNotes.push(
      "Conditions are relatively stable, but slight concerns about water flow rates and ice thickness."
    );
  } else {
    observationNotes.push("Normal conditions. No immediate action needed.");
    observationNotes.push("Stable weather and glacier conditions observed.");
  }

  // Alert type specific messages
  if (alertType === "Critical - Immediate action needed") {
    observationNotes.push(
      "GLOF risk is high! Major intervention may be required."
    );
  } else if (alertType === "High risk - Monitor closely") {
    observationNotes.push(
      "Monitoring advised. Ensure that structural integrity of dams is checked."
    );
  } else if (
    alertType === "Moderate risk - Increased observation recommended"
  ) {
    observationNotes.push(
      "Consider improving observation systems to detect sudden changes in water flow."
    );
  } else if (alertType === "Low risk - Keep under routine surveillance") {
    observationNotes.push(
      "No immediate danger, but keep an eye on the situation for any sudden changes."
    );
  } else {
    observationNotes.push(
      "No action required at the moment. Continue regular monitoring."
    );
  }

  // Environmental conditions based notes
  if (snowfall > 15) {
    observationNotes.push(
      `Heavy snowfall observed: ${snowfall.toFixed(
        1
      )} cm. Could increase the ice melt rate.`
    );
  }

  if (rainfallIntensity > 10) {
    observationNotes.push(
      `Heavy rainfall recorded: ${rainfallIntensity.toFixed(
        1
      )} mm/h. This may exacerbate ice melt.`
    );
  }

  if (iceThickness < 10) {
    observationNotes.push(
      "Ice thickness is alarmingly low, indicating a higher risk of collapse."
    );
  }

  if (windSpeed > 10) {
    observationNotes.push(
      `Strong winds detected: ${windSpeed.toFixed(
        1
      )} m/s. May affect ice stability.`
    );
  }

  return observationNotes.join(" ");
};

randomDataGenerator = (objectId, dateAndTime) => {
  // Base random values
  const temperature = parseFloat((Math.random() * (30 - -20) + -20).toFixed(2)); // Temperature between -20°C and 30°C
  const waterTemperature = parseFloat(
    Math.min(Math.max(temperature + Math.random() * 2, 0), 20).toFixed(2)
  ); // Water temperature based on air temperature

  const waterFlowRate = parseFloat((Math.random() * 10 + 5).toFixed(2)); // Water flow rate between 5 and 15 m³/s
  const iceThickness = parseFloat(
    Math.max(0, 100 - waterFlowRate * 0.5).toFixed(2)
  ); // Ice thickness decreases with higher flow rate

  const waterLevel = parseFloat(
    Math.min(25, Math.max(10, 10 + iceThickness * 0.1)).toFixed(2)
  ); // Water level depends on ice thickness
  const lakeSize = parseFloat(Math.min(25, 5 + waterLevel * 0.2).toFixed(2)); // Lake size depends on water level
  const groundPressure = parseFloat(
    Math.min(120, 100 + lakeSize * 0.5).toFixed(2)
  ); // Ground pressure depends on lake size
  const damPressure = parseFloat(
    Math.min(150, groundPressure * 1.2).toFixed(2)
  ); // Dam pressure depends on ground pressure
  
  const morainePressure = parseFloat((Math.min(100, groundPressure * 1.2) + Math.random() * 50).toFixed(2));  
  
  const windSpeed = parseFloat((Math.random() * 10 + 2).toFixed(2)); // Wind speed between 2 m/s and 12 m/s
  const windDirection = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][
    Math.floor(Math.random() * 8)
  ]; // Wind direction

  const phValue = parseFloat((Math.random() * (8 - 6) + 6).toFixed(2)); // pH between 6 and 8
  const rainfallIntensity = parseFloat((Math.random() * 20).toFixed(2)); // Rainfall intensity between 0 mm/h and 20 mm/h
  const soilMoisture = parseFloat(
    Math.min(60, Math.random() * 50 + 10 + rainfallIntensity * 0.3).toFixed(2)
  ); // Soil moisture depends on rainfall
  const iceMeltRate = parseFloat(
    Math.min(0.3, Math.random() * 0.2 + rainfallIntensity * 0.05).toFixed(2)
  ); // Ice melt rate increases with rainfall intensity

  const altitude = parseFloat((Math.random() * 4000 + 2000).toFixed(0)); // Altitude between 2000m and 6000m (rounded to nearest integer)
  const humidity = parseFloat((Math.random() * 100).toFixed(2)); // Humidity between 0% and 100%
  const co2Level = parseFloat((Math.random() * 100 + 350).toFixed(2)); // CO2 level between 350 ppm and 450 ppm

  const groundTemperature = parseFloat(
    (Math.random() * (5 - -10) + -10).toFixed(2)
  ); // Ground temperature between -10°C and 5°C
  const groundComposition = parseFloat((Math.random() * 10).toFixed(2)); // Ground composition between 0% and 10%
  const soilTemperature = parseFloat(
    Math.max(-5, Math.min(10, soilMoisture * 0.1 - 0.5)).toFixed(2)
  ); // Soil temperature affected by moisture

  // New snowfall random value added
  const snowfall = parseFloat((Math.random() * 30).toFixed(2)); // Snowfall between 0 cm and 30 cm

  // Determine Alert Level based on multiple factors
  let alertLevel = 0;
  let alertType = "Normal conditions";

  // Factors influencing the alert level:
  let riskScore = 0;

  // 1. Water Flow Rate & Ice Thickness:
  riskScore += (waterFlowRate > 12 ? 2 : 0) + (iceThickness < 10 ? 2 : 0); // High flow and low ice = higher risk

  // 2. Water Level and Lake Size:
  riskScore += (waterLevel > 20 ? 2 : 0) + (lakeSize > 15 ? 2 : 0); // High water level and large lake = higher risk

  // 3. Ground and Dam Pressure:
  riskScore += (groundPressure > 110 ? 2 : 0) + ((damPressure > 130 ? 2 : 0) / 2) + ((morainePressure > 80 ? 2 : 0) / 2); // High ground and dam pressure = higher risk

  // 4. Rainfall Intensity and Soil Moisture:
  riskScore += (rainfallIntensity > 10 ? 2 : 0) + (soilMoisture > 50 ? 2 : 0); // High rainfall and soil moisture = increased risk

  // 5. Snowfall and Ice Melt Rate:
  riskScore += (snowfall > 15 ? 2 : 0) + (iceMeltRate > 0.2 ? 2 : 0); // High snowfall and rapid ice melt = higher risk

  // 6. Landslide Risk:
  riskScore += waterFlowRate > 12 ? 2 : 0; // High flow increases landslide risk

  // Calculate Alert Level based on riskScore
  if (riskScore >= 10) {
    alertLevel = 5; // Critical
    alertType = "Critical - Immediate action needed";
  } else if (riskScore >= 8) {
    alertLevel = 4; // High Risk
    alertType = "High risk - Monitor closely";
  } else if (riskScore >= 6) {
    alertLevel = 3; // Moderate Risk
    alertType = "Moderate risk - Increased observation recommended";
  } else if (riskScore >= 4) {
    alertLevel = 2; // Low Risk
    alertType = "Low risk - Keep under routine surveillance";
  } else {
    alertLevel = 1; // Normal Conditions
    alertType = "Normal conditions - No action required";
  }

  // Generate observation notes based on alert level and environmental factors
  const observationNotes = generateObservationNotes(
    alertLevel,
    alertType,
    temperature,
    waterFlowRate,
    iceThickness,
    windSpeed,
    snowfall,
    rainfallIntensity
  );

  // Landslide risk (higher water flow rate increases landslide risk)
  const landslideRisk =
    waterFlowRate > 12 ? "High" : waterFlowRate > 8 ? "Medium" : "Low";

  // Avalanche Risk Calculation
  const avalancheRisk =
    snowfall > 20 || windSpeed > 8
      ? "High"
      : snowfall > 10 || windSpeed > 5
      ? "Medium"
      : "Low";

  // Earthquake Risk Calculation
  const earthquakeRisk =
    groundPressure > 115 || altitude > 5000
      ? "High"
      : groundPressure > 110 || altitude > 4000
      ? "Medium"
      : "Low";

  return {
    glacialId: objectId,
    articTern: {
      lakeSize, // Derived from water level
      temperature,
      windSpeed,
      windDirection,
      altitude,
      humidity,
      co2Level,
    },
    penguin: {
      waterLevel, // Derived from ice thickness
      waterTemperature, // Based on air temperature
      waterFlowRate, // Influenced by temperature
      groundTemperature,
      groundComposition,
    },
    eel: {
      damPressure, // Depends on ground pressure
      morainePressure, // Dependent on ground pressure
      groundPressure, // Dependent on lake size
      phValue,
      iceThickness, // Based on water flow rate
      soilTemperature, // Affected by soil moisture
      soilMoisture, // Influenced by rainfall intensity
    },
    otherFactor: {
      rainfallIntensity,
      snowfall, // Now included correctly
      precipitation: parseFloat((Math.random() * 25).toFixed(2)), // Precipitation between 0 mm/h and 25 mm/h
      iceMeltRate, // Affected by rainfall intensity
      landslideRisk,
      avalancheRisk,
      earthquakeRisk,
    },
    alertLevel,
    alertType,
    observationNotes: observationNotes,
    recordedAt: dateAndTime,
  };
};

module.exports = (objectId) => {
  const dataEntries = [];

  for (let i = 1; i <= 30; i++) {
    let day = Math.floor(Math.random() * 30) + 1; // Random day of November
    const hour = Math.floor(Math.random() * 9) + 9; // Random hour between 9 and 18
    const minute = Math.floor(Math.random() * 60); // Random minute
    const second = Math.floor(Math.random() * 60); // Random second
    day = i;
    console.log(day);
    const dateTime = new Date(2024, 10, day, hour, minute, second); // Month 10 = November

    const randomData = randomDataGenerator(objectId, dateTime);
    dataEntries.push(randomData);
  }

  return dataEntries;
};

// // Example usage:
// const objectId = "exampleObjectId123"; // Replace with actual ObjectId
// const novemberData = generateRandomDataNovember(objectId);
// console.log(novemberData);
