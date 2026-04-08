// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { hooks as authHooks } from '@feathersjs/authentication-local' // <--- 1. AGREGAMOS ESTA IMPORTACIÓN
import { UserService, getOptions } from './users.class.js'

export const userPath = 'users'
export const userMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './users.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const user = app => {
  // Register our service on the Feathers application
  app.use(userPath, new UserService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  // Initialize hooks
  app.service(userPath).hooks({
    around: {
      all: [],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [],
      find: [],
      get: [],
      // USAMOS EL NUEVO NOMBRE AQUÍ:
      create: [authHooks.hashPassword('password')],
      patch: [authHooks.hashPassword('password')],
      remove: []
    },
    after: {
      all: [
        // Protegemos la contraseña para que no se envíe en las respuestas
        (context) => {
          if (context.result && context.result.password) {
            delete context.result.password
          }
          if (Array.isArray(context.result)) {
            context.result.forEach(user => {
              if (user.password) delete user.password
            })
          }
          return context
        }
      ]
    },
    error: {
      all: []
    }
  })
}