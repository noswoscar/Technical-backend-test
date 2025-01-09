import { DIContainer } from '../../App/DIContainer'
import { DatabaseConnector } from '../DatabaseConnector'
import { Fleet } from '../../Domain/agregates/Fleet'
import { FleetIdentity } from '../../Domain/valueObjects/FleetIdentity'
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
                        [fleet.getFleetIdentity().getId()]
                  )
                  if (res === undefined) {
                        return undefined
                  }
                  return res.rows[0].fleet_id
            } catch (err: unknown) {
                  console.error('Error executing query to find a fleet')
            }
      }

      insert = async (fleet: Fleet): Promise<string | undefined> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const fleetIdentity = fleet.getFleetIdentity()
                  const res = await client.query(
                        'INSERT INTO fleets (fleet_id, fleet_name, created_at, vehicles) VALUES ($1, $2, NOW(), $3) RETURNING fleet_id;',
                        [fleetIdentity.getId(), fleetIdentity.getUserName(), []]
                  )
                  return res.rows[0].fleet_id
            } catch (err: unknown) {
                  console.error('Error executing query to insert a new fleet')
                  return undefined
            }
      }

      registerVehicle = async (
            vehicleId: number,
            fleetId: string
      ): Promise<boolean> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res = await client.query(
                        `UPDATE fleets SET vehicles = array_append(vehicles, $1) WHERE fleet_id = $2;`,
                        [vehicleId, fleetId]
                  )
                  return true
            } catch (err: unknown) {
                  console.error(
                        'Error executing query to update a fleet with a new vehicle'
                  )
                  return false
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

      findFleets = async (): Promise<Array<Fleet> | undefined> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res:
                        | QueryResult<{
                                fleet_name: string
                                fleet_id: string
                                vehicles: Array<string>
                          }>
                        | undefined = await client.query('select * from fleets')
                  if (res === undefined) {
                        return undefined
                  }
                  let rows: Array<{
                        fleet_name: string
                        fleet_id: string
                        vehicles: Array<string>
                  }> = res.rows
                  let fleets: Array<Fleet> = []
                  for (let i = 0; i < rows.length; i++) {
                        const fleetIdentity = new FleetIdentity(
                              rows[i].fleet_name,
                              rows[i].fleet_id
                        )
                        const vehicles = rows[i].vehicles.map((vehicle) =>
                              parseInt(vehicle)
                        )
                        const newFleet = new Fleet(fleetIdentity, vehicles)
                        fleets.push(newFleet)
                  }
                  return fleets
            } catch (err: unknown) {
                  console.error('Error executing query to find a fleet')
            }
      }
}
