import { reservation } from './reservation/reservation.js'
import { review } from './review/review.js'
import { user } from './users/users.js'
export const services = app => {
  app.configure(reservation)

  app.configure(review)

  app.configure(user)

  // All services will be registered here
}
