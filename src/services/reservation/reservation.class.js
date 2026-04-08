import { KnexService } from '@feathersjs/knex'

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ReservationService extends KnexService {}

export const getOptions = app => {
  return {
    paginate: {
      ...app.get('paginate'),
      max: 10000
    },
    Model: app.get('mysqlClient'),
    name: 'reservation'
  }
}
