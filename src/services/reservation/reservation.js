// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { ReservationService, getOptions } from './reservation.class.js'

export const reservationPath = 'reservation'
export const reservationMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './reservation.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const reservation = app => {
  // Register our service on the Feathers application
  app.use(reservationPath, new ReservationService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: reservationMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(reservationPath).hooks({
    around: {
      all: []
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
      all: []
    },
    error: {
      all: []
    }
  })
}
