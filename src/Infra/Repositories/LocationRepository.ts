import { DIContainer } from '../../App/DIContainer'
import { DatabaseConnector } from '../DatabaseConnector'
import { ILocationRepository } from './interfaces/ILocationRepository'
import { QueryResult } from 'pg'
import { VehicleLocation } from '../../Domain/entities/VehicleLocation'

export class LocationRepository implements ILocationRepository {
      constructor() {}

      insert = async (
            location: VehicleLocation
      ): Promise<string | undefined> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res: QueryResult<{ id: string }> | undefined =
                        await client.query(
                              'INSERT INTO locations (latitude, longitude, altitude) VALUES ($1, $2, $3) RETURNING id;',
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
                              `UPDATE locations SET vehicle = $1 WHERE id = $2;`,
                              [vehicleId.toString(), locationId]
                        )
                  return true
            } catch (err: unknown) {
                  console.error(
                        'Error executing query to update a Location with a vehicle'
                  )
                  return false
            }
      }

      vehicleIsAtLocation = async (locationId: string): Promise<boolean> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res: QueryResult<{ vehicle: string }> | undefined =
                        await client.query(
                              `select vehicle from locations where id = $1;`,
                              [locationId]
                        )
                  if (res.rows[0].vehicle) return true
                  return false
            } catch (err: unknown) {
                  console.error(
                        'Error executing query to update a Location with a vehicle'
                  )
                  return false
            }
      }

      getVehicleAtLocation = async (
            locationId: string
      ): Promise<string | undefined> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            try {
                  const res: QueryResult<{ vehicle: string }> | undefined =
                        await client.query(
                              `select vehicle from locations where id = $1;`,
                              [locationId]
                        )
                  return res.rows[0].vehicle
            } catch (err: unknown) {
                  console.error(
                        'Error executing query to update a Location with a vehicle'
                  )
                  return undefined
            }
      }
}
