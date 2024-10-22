import { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.text("username").notNullable();
    table.text("bio").nullable().defaultTo(null);
  });

  await knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.text("text").notNullable();
    table.text("hashtags").nullable().defaultTo(null);
    table
      .integer("user_id")
      .index()
      .unsigned()
      .references("id")
      .inTable("users");
  });
}
export async function down(knex: Knex) {
  await knex.schema.dropTable("posts");
  await knex.schema.dropTable("users");
}
