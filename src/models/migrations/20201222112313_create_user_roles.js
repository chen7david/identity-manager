exports.up = function(knex) {
  return knex.schema.createTable('user_roles', (table) => {
    table.increments().primary()
    table.unique(['user_id', 'role_id'])
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').index().notNullable()
    table.integer('role_id').references('id').inTable('roles').onDelete('CASCADE').index().notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('user_roles')
}