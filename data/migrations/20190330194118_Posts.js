exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("profiles", table => {
      table.increments();
      table
        .string("username", 128)
        .notNullable()
        .unique();
      table.string("password", 20).notNullable();
      table.string("thumbnailUrl", 256);
    })
    .createTable("posts", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("profiles")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("imageUrl", 256);
      table.integer("likes");
    })
    .createTable("comments", table => {
      table.increments();
      table
        .string("text", 500)
        .notNullable()
        .unique();
      table
        .integer("post_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("posts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("profiles")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("comments")
    .dropTableIfExists("posts")
    .dropTableIfExists("profiles");
};
