// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { ReviewService, getOptions } from './review.class.js'

export const reviewPath = 'review'
export const reviewMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './review.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const review = app => {
  // Register our service on the Feathers application
  app.use(reviewPath, new ReviewService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: reviewMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(reviewPath).hooks({
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
