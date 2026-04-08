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
          // Si el usuario ya está en el resultado (por config de Feathers), no hacemos nada
          if (context.result.user) return context

          // Si la autenticación fue exitosa, el usuario debería estar en context.params.user
          if (context.params.user) {
            context.result.user = context.params.user
          } else if (context.params.authStrategy === 'local') {
            // Solo advertimos si es estrategia local y falta el usuario
            console.warn('AVISO: No se encontró el usuario en params para la respuesta de auth.')
          }
          return context
        }
      ]
    }
  })
}

