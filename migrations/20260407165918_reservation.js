export async function up(knex) {
  await knex.schema.createTable('reservation', (table) => {
    table.increments('id')
    // Relación con el usuario logueado
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

    // Campos de tu ReservationModel
    table.string('cliente').notNullable()
    table.string('email_cliente').notNullable()
    table.string('plan').notNullable()
    table.string('fecha_evento').notNullable()
    table.string('horario').notNullable()
    table.string('estado').defaultTo('Pendiente')

    table.timestamp('creado_en').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  await knex.schema.dropTable('reservation')
}