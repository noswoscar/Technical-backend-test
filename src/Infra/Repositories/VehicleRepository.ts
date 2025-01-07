import { DIContainer } from '../../App/DIContainer'
import { DatabaseConnector } from '../DatabaseConnector'
import { QueryResult } from 'pg'
import { Vehicle } from '../../Domain/entities/Vehicle'

export class VehicleRepository {
      constructor() {}
      find = () => {}

      getVehicleLocation = async (
            vehicleId: number
      ): Promise<string | undefined> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res: QueryResult<{ location: string }> | undefined =
                        await client.query(
                              `SELECT location from vehicles WHERE id = $1;`,
                              [vehicleId.toString()]
                        )
                  return res.rows[0].location
            } catch (err: unknown) {
                  console.error(
                        'Error executing query to update a Location with a vehicle'
                  )
                  return undefined
            }
      }

      insert = async (vehicle: Vehicle): Promise<number | undefined> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const vehicleIdentity = vehicle.getVehicleIdentity()
                  const res: QueryResult<{ id: number }> = await client.query(
                        'INSERT INTO vehicles (number_plate, type, location, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *;',
                        [
                              vehicleIdentity.getVehiclePlateNumber(),
                              vehicleIdentity.getVehicleType(),
                              vehicle.getLocationId(),
                        ]
                  )
                  return res.rows[0].id
            } catch (err: unknown) {
                  console.error('Error executing query to insert a new Vehicle')
                  return undefined
            }
      }

      addLocationToVehicle = async (
            locationId: string,
            vehicleId: number
      ): Promise<boolean> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res: QueryResult<{ id: number }> = await client.query(
                        `UPDATE vehicles SET location = $1 WHERE id = $2;`,
                        [locationId, vehicleId]
                  )
                  return true
            } catch (err: unknown) {
                  console.error('Error executing query to insert a new Vehicle')
                  return false
            }
      }

      update = () => {}

      delete = () => {}
}
