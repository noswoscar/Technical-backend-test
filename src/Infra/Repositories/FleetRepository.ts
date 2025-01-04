import { DIContainer } from '../../App/DIContainer'
import { DatabaseConnector } from '../DatabaseConnector'
import { Fleet } from '../../Domain/entities/Fleet'
import { IFleetRepository } from './interfaces/IFleetRepository'
import { QueryResult } from 'pg'
import { Vehicle } from '../../Domain/entities/Vehicle'

export class FleetRepository implements IFleetRepository {
      constructor() {}
      find = () => {}
      findVehicleInFleet = async (
            vehicle: Vehicle,
            fleet: Fleet
      ): Promise<QueryResult<any> | undefined> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res = await client.query(
                        'select * from fleets where fleet_id = $1',
                        [fleet.getFleetId()]
                  )
                  return res
            } catch (err: any) {
                  console.error('Error executing query:', err.message)
                  console.error('PostgreSQL error code:', err.code)
                  console.error('Detailed error:', err)
            }
      }

      insert = async (fleet: Fleet) => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res = await client.query(
                        'INSERT INTO fleets (fleet_id, fleet_name, created_at, vehicles) VALUES ($1, $2, NOW(), $3) RETURNING fleet_id;',
                        [
                              fleet.getFleetId(),
                              fleet.getFleetName(),
                              fleet.getVehiclesPlates(),
                        ]
                  )
                  return res
            } catch (err: any) {
                  console.error('Error executing query:', err.message)
                  console.error('PostgreSQL error code:', err.code)
                  console.error('Detailed error:', err)
            }
      }

      update = () => {}

      updateVehicles = async (
            fleet: Fleet
      ): Promise<QueryResult<any> | undefined> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res = await client.query(
                        `UPDATE fleets SET vehicles = $1 WHERE fleet_id = $2;`,
                        [fleet.getVehiclesPlates(), fleet.getFleetId()]
                  )
                  return res
            } catch (err: any) {
                  console.error('Error executing query:', err.message)
                  console.error('PostgreSQL error code:', err.code)
                  console.error('Detailed error:', err)
            }
      }

      delete = () => {}
}
