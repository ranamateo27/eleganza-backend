// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers } from '@feathersjs/feathers'
import express, {
  rest,
  json,
  urlencoded,
  cors,
  serveStatic,
  notFound,
  errorHandler
} from '@feathersjs/express'
import configuration from '@feathersjs/configuration'
import socketio from '@feathersjs/socketio'

import { logger } from './logger.js'
import { logError } from './hooks/log-error.js'
import { mysql } from './mysql.js'
import { authentication } from './authentication.js'
import { services } from './services/index.js'
import { channels } from './channels.js'

const app = express(feathers())

// Load app configuration
app.configure(configuration())
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
// Host the public folder
app.use('/', serveStatic(app.get('public')))

// Configure services and real-time functionality
app.configure(rest())
app.configure(
  socketio({
    cors: {
      origin: app.get('origins')
    }
  })
)
app.configure(mysql)

app.configure(authentication)

app.configure(services)
app.configure(channels)

// --- CUSTOM ENDPOINT TO CLEAR SYSTEM (ENDPOINT PERSONALIZADO PARA REINICIAR SISTEMA) ---
app.post('/clear-all', async (req, res) => {
  try {
    const knex = app.get('mysqlClient')
    // Borrar en orden correcto respetando las FK (Foreign Keys)
    // reservation y review dependen de users, así que se borran primero
    await knex('reservation').delete()
    await knex('review').delete()
    res.status(201).json({ message: 'Sistema reiniciado correctamente' })
  } catch (error) {
    logger.error('Error in /clear-all:', error)
    res.status(500).json({ error: 'No se pudo reiniciar el sistema', detail: error.message })
  }
})

// Configure a middleware for 404s and the error handler
app.use(notFound())
app.use(errorHandler({ logger }))

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
})

export { app }
