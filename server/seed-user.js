// seed-users.js

const knex = require("knex")(require("./knexfile"));

const users = [
  { id: 1, name: "User1" }, // User with id 1
];

// Seed the 'user' table
knex("user")
  .insert(users)
  .then(() => {
    console.log("Users seeded successfully");
    knex.destroy(); // Close the database connection
  })
  .catch((error) => {
    console.error("Error seeding users:", error);
    knex.destroy(); // Close the database connection
  });
