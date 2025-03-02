import { QueryResult } from 'pg'
import { DIContainer } from '../../App/DIContainer'
import { Vehicle } from '../../Domain/entities/Vehicle'
import { DatabaseConnector } from '../DatabaseConnector'
import { IVehicleRepository } from './interfaces/IVehicleRepository'

export class VehicleRepository implements IVehicleRepository {
      constructor() {}

      findByPlate = async (
            vehicleNumberPlate: number
      ): Promise<number | undefined> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res: QueryResult<{ id: number }> | undefined =
                        await client.query(
                              `SELECT * from vehicles WHERE number_plate = $1;`,
                              [vehicleNumberPlate]
                        )
                  if (!res) return undefined
                  return res.rows[0].id
            } catch (err: unknown) {
                  console.error(
                        'Error executing query to find a vehicle by its number plate'
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
                  console.error(
                        'Error executing query to update a Vehicle with a new location Id'
                  )
                  return false
            }
      }

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
                        'Error executing query to get a location id for a said vehicle'
                  )
                  return undefined
            }
      }
}
