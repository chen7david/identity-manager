exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments().primary()
    table.string('userId').unique().notNullable()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.boolean('confirmed').defaultTo(false)
    table.boolean('suspended').defaultTo(false)
    table.boolean('disabled').defaultTo(false)
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}