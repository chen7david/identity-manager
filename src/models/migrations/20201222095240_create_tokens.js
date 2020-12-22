exports.up = function(knex) {
  return knex.schema.createTable('tokens', (table) => {
    table.increments().primary()
    table.string('tokenId').unique().notNullable()
    table.integer('refresh_count').defaultTo(0)
    table.integer('call_count').defaultTo(0)
    table.boolean('revoked').defaultTo(false)
    table.boolean('active').defaultTo(true)
    table.text('useragent')
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').index().notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('tokens')
}