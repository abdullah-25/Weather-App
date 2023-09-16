require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const knex = require("knex")(require("./knexfile"));

const app = express();
const CurrentWeatherRoute = require("./routes/current_temp");
const HistoricalWeatherRoute = require("./routes/historical_temp");
const PORT = process.env.PORT || 5050;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(express.static("public"));
// Set the maximum request size limit to 10 MB (adjust as needed)

// // register routes
app.get("/", (req, res) => {
  res.send("hiii");
});
app.use("/current", CurrentWeatherRoute);
app.use("/historical", HistoricalWeatherRoute);

// go!!
app.listen(PORT, () => {
  console.log("server started on port", PORT);
});
