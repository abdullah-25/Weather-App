const knex = require("knex")(require("./knexfile"));

const users = [
  {
    id: 1,
    user_id: 1,
    Historical_temperature: {
      "2023-05-31T00:00": 11.8,
      "2023-06-01T00:00": 14.9,
      "2023-06-02T00:00": 18.3,
      "2023-06-03T00:00": 19.7,
      "2023-06-04T00:00": 13,
    },
  }, // User with id 1
];

// Seed the 'user' table
knex("historical_temperatures")
  .insert(users)
  .then(() => {
    console.log("Users seeded successfully");
    knex.destroy(); // Close the database connection
  })
  .catch((error) => {
    console.error("Error seeding users:", error);
    knex.destroy(); // Close the database connection
  });
