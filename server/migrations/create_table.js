exports.up = function (knex) {
  return knex.schema
    .createTable("user", function (table) {
      table.increments("id").primary();
      table.string("name");
    })
    .createTable("current_temperatures", function (table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.float("temperature").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());

      // Define a foreign key constraint to link current_temperatures with the user table
      table.foreign("user_id").references("user.id").onDelete("CASCADE");
    })

    .createTable("historical_temperatures", function (table) {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable(); // Foreign key to the user table
      table.json("Historical_temperature").notNullable();

      table.timestamp("created_at").defaultTo(knex.fn.now());

      // Define a foreign key constraint to link historical_temperatures with the user table
      table.foreign("user_id").references("user.id").onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("historical_temperatures")
    .dropTable("current_temperatures")
    .dropTable("user");
};
