const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../server/knexfile"));

function postCurrentTemp(req, res) {
  const { temperature, user_id } = req.body;
  console.log("Request Body:", req.body); // Log the request body

  // Check if temperature and user_id are present in the request body
  if (temperature === undefined || user_id === undefined) {
    return res.status(400).json({
      message: "Temperature and user_id are required in the request body.",
    });
  }

  // Define the new entry to insert into the database
  const newEntry = {
    temperature: temperature,
    user_id: user_id, // Include user_id in the new entry
  };

  knex("current_temperatures")
    .insert(newEntry)
    .then(() => {
      res.status(200).send("Current temperature created successfully");
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error inserting temperature: " + error.message });
    });
}

router.post("/", postCurrentTemp);

module.exports = router;
