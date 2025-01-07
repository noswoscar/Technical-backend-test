import { DIContainer } from '../../App/DIContainer'
import { DatabaseConnector } from '../DatabaseConnector'
import { Fleet } from '../../Domain/entities/Fleet'
import { IFleetRepository } from './interfaces/IFleetRepository'
import { QueryResult } from 'pg'

export class FleetRepository implements IFleetRepository {
      constructor() {}
      find = async (
            fleet: Fleet
      ): Promise<{ fleet_id: string } | undefined> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res = await client.query(
                        'select * from fleets where fleet_id = $1',
                        [fleet.getFleetidentity().getId()]
                  )
                  if (res === undefined) {
                        return undefined
                  }
                  return res.rows[0].fleet_id
            } catch (err: unknown) {
                  console.error('Error executing query to find a fleet')
            }
      }

      verifyVehicleInFleet = async (
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
                  if (fleetVehicles.includes(vehicleId.toString())) return true
                  return false
            } catch (err: unknown) {
                  console.error(
                        'Error executing query to vefify a vehicle is in a fleet'
                  )
                  return false
            }
      }

      insert = async (fleet: Fleet): Promise<string | undefined> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const fleetIdentity = fleet.getFleetidentity()
                  const res = await client.query(
                        'INSERT INTO fleets (fleet_id, fleet_name, created_at, vehicles) VALUES ($1, $2, NOW(), $3) RETURNING fleet_id;',
                        [
                              fleetIdentity.getId(),
                              fleetIdentity.getUserName(),
                              fleet.getVehiclesPlateNumbers(),
                        ]
                  )
                  return res.rows[0].fleet_id
            } catch (err: unknown) {
                  console.error('Error executing query to insert a new fleet')
                  return undefined
            }
      }

      update = () => {}

      registerVehicle = async (
            vehicleId: number,
            fleetId: string
      ): Promise<boolean> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res = await client.query(
                        `UPDATE fleets SET vehicles = $1 WHERE fleet_id = $2;`,
                        [[vehicleId.toString()], fleetId]
                  )
                  return true
            } catch (err: unknown) {
                  console.error(
                        'Error executing query to update a fleet with a new vehicle'
                  )
                  return false
            }
      }

      delete = () => {}
}
