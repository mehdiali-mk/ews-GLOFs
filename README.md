# ews-GLOFs

Early detection and mitigation of Glacial Lake Outburst Floods (GLOFs). This project is from SIH 2024.

# THINKS THAT WE SHOULD KNOW.

The aim of our prototype system is:
Early detection and mitigation of Glacial Lake Outburst Floods (GLOFs).

## We assume we have three sensors components:

### Arctic Tern:

This sensor gives us the following data.
Glacial Lake Size (lakeSize).
Temperature around lake (temperature).
Wind speed (windSpeed).
Dam Stability (damPressure).

### Penguin:

This sensor gives us the following data.
Glacial Lake Water Level (waterLevel).
Glacial Lake Water Temperature (waterTemperature).
Glacial Water Flow Rates (waterFlowRate).

### Electric Eel:

This sensor gives us the following data.
Glacial Lake Ground Pressure (groundPressure).

## Data Collection:

We create a JavaScript function to generate random data for all the sensors mention above. They will have some constant numbers to create alerts. How to create alerts will discuss while development.
After generating the random data, data will be saved in database for further analysis.

## Analysis:

We will create a mathematical algorithm using generated data to create early alerts. Early alerts will be (Yellow, Orange, Red).

## Visualization:

The past data that are stored in our database will be shown in a separate page in tabular format.
