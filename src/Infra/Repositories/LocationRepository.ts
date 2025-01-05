import { DIContainer } from '../../App/DIContainer'
import { DatabaseConnector } from '../DatabaseConnector'
import { QueryResult } from 'pg'
import { VehicleLocation } from '../../Domain/entities/VehicleLocation'

export class LocationRepository {
      constructor() {}
      find = () => {}

      insert = async (
            location: VehicleLocation
      ): Promise<string | undefined> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res: QueryResult<{ id: string }> | undefined =
                        await client.query(
                              'INSERT INTO locations (latitude, longitude, altitude) VALUES ($1, $2, $3) RETURNING *;',
                              [
                                    location.getCoordinates().latitude,
                                    location.getCoordinates().longitude,
                                    location.getCoordinates().altitude,
                              ]
                        )
                  return res.rows[0].id
            } catch (err: unknown) {
                  console.error(
                        'Error executing query to insert a new Location'
                  )
                  return undefined
            }
      }

      addVehicleToLocation = async (
            vehicleId: number,
            locationId: string
      ): Promise<boolean> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res: QueryResult<{ id: string }> | undefined =
                        await client.query(
                              'INSERT INTO locations (vehicle) VALUES ($1) RETURNING *;',
                              [vehicleId]
                        )
                  if (res.rows[0].id) {
                        return true
                  }
                  return false
            } catch (err: unknown) {
                  console.error(
                        'Error executing query to insert a new Location'
                  )
                  return false
            }
      }

      update = () => {}

      delete = () => {}
}
