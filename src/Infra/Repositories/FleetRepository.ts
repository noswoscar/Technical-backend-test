import { DIContainer } from '../../App/DIContainer'
import { DatabaseConnector } from '../DatabaseConnector'
import { Fleet } from '../../Domain/entities/Fleet'
import { IRepository } from './interfaces/IRepository'

export class FleetRepository implements IRepository {
      constructor() {}
      find = () => {}

      insert = async (fleet: Fleet) => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            const res = await client.query(
                  'INSERT INTO fleets (fleet_id, fleet_name, created_at) VALUES ($1, $2, NOW()) RETURNING fleet_id;',
                  [fleet.getFleetId(), fleet.getFleetName()]
            )
      }

      update = () => {}

      delete = () => {}
}
