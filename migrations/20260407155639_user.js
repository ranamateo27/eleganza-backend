export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')           // ID autoincremental para MySQL
    table.string('nombre').notNullable()
    table.string('apellido').notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.string('telefono')
    table.string('rol').defaultTo('cliente')
    table.timestamp('creado_en').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}