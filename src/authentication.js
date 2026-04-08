// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import { LocalStrategy } from '@feathersjs/authentication-local'

export const authentication = app => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())

  app.use('authentication', authentication)

  // --- POPULATE USER IN AUTH RESPONSE ---
  app.service('authentication').hooks({
    after: {
      create: [
        (context) => {
          // Si la autenticación fue exitosa, el usuario debería estar en context.params.user
          if (context.params.user) {
            context.result.user = context.params.user
          } else {
            console.warn('⚠️ CUIDADO: No se encontró el usuario en context.params.user para poblar la respuesta.')
          }
          return context
        }
      ]
    }
  })
}

