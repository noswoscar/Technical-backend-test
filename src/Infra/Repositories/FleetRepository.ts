import { DIContainer } from '../../App/DIContainer'
import { DatabaseConnector } from '../DatabaseConnector'
import { Fleet } from '../../Domain/entities/Fleet'
import { IFleetRepository } from './interfaces/IFleetRepository'
import { QueryResult } from 'pg'

export class FleetRepository implements IFleetRepository {
      constructor() {}
      find = async (fleet: Fleet) => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res = await client.query(
                        'select * from fleets where fleet_id = $1',
                        [fleet.getFleetId()]
                  )
                  if (res === undefined) {
                        return undefined
                  }
                  return res.rows[0]
            } catch (err: any) {
                  console.error('Error executing query:', err.message)
                  console.error('PostgreSQL error code:', err.code)
                  console.error('Detailed error:', err)
            }
      }
      ////wrong
      findVehicleInFleet = async (
            vehicleId: number,
            fleetId: string
      ): Promise<boolean> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res: QueryResult<{ vehicles: Array<string> }> =
                        await client.query(
                              'select * from fleets where fleet_id = $1',
                              [fleetId]
                        )
                  const fleetVehicles = res.rows[0].vehicles
                  console.log('result of query : ', fleetVehicles)
                  if (fleetVehicles.includes(vehicleId.toString())) return true
                  return false
            } catch (err: any) {
                  console.error('Error executing query:', err.message)
                  console.error('PostgreSQL error code:', err.code)
                  console.error('Detailed error:', err)
                  return false
            }
      }

      insert = async (fleet: Fleet): Promise<string | undefined> => {
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
                  return res.rows[0].fleet_id
            } catch (err: unknown) {
                  if (err instanceof Error) {
                        console.error('Error executing query:', err.message)
                        console.error('Detailed error:', err)
                  }
                  return undefined
            }
      }

      update = () => {}

      registerVehicle = async (
            vehicleId: number,
            fleetId: string
      ): Promise<boolean | undefined> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res = await client.query(
                        `UPDATE fleets SET vehicles = $1 WHERE fleet_id = $2;`,
                        [[vehicleId.toString()], fleetId]
                  )
                  return true
            } catch (err: any) {
                  console.error('Error executing query:', err.message)
                  console.error('PostgreSQL error code:', err.code)
                  console.error('Detailed error:', err)
                  return false
            }
      }

      delete = () => {}
}
