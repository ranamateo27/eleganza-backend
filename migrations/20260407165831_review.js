export async function up(knex) {
  await knex.schema.createTable('review', (table) => {
    table.increments('id')
    // Relación con el usuario que comenta
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

    // Campos de tu ReviewModel
    table.string('nombre').notNullable() // El nombre de quien escribe la reseña
    table.integer('estrellas').notNullable()
    table.text('comentario')

    table.timestamp('fecha').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  await knex.schema.dropTable('review')
}