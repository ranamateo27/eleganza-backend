import { authenticate } from '@feathersjs/authentication'
import { ReservationService, getOptions } from './reservation.class.js'
import { populateUser } from './reservation.hooks.js'

export const reservationPath = 'reservation'
export const reservationMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './reservation.class.js'

export const reservation = app => {
  app.use(reservationPath, new ReservationService(getOptions(app)), {
    methods: reservationMethods,
    events: []
  })

  app.service(reservationPath).hooks({
    around: {
      // Se protegen las reservas con JWT
      all: [authenticate('jwt')]
    },
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      patch: [],
      remove: []
    },
    after: {
      // EL POPULATE SE EJECUTA AQUÍ:
      // Se ejecuta después de obtener los datos de MySQL
      all: [populateUser]
    },
    error: {
      all: []
    }
  })
}