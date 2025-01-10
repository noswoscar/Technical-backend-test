import { QueryResult } from 'pg'
import { DIContainer } from '../../App/DIContainer'
import { VehicleLocation } from '../../Domain/entities/VehicleLocation'
import { Coordinates } from '../../Domain/valueObjects/Coordinates'
import { DatabaseConnector } from '../DatabaseConnector'
import { ILocationRepository } from './interfaces/ILocationRepository'

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
                        'Error executing query to verify a location has a said vehicle'
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
                        'Error executing query to get a vehicle at location'
                  )
                  return undefined
            }
      }
      updateLocation = async (
            locationId: string,
            vehicleId: number,
            coordinates: Coordinates
      ): Promise<boolean> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()

            try {
                  const res: QueryResult | undefined = await client.query(
                        `UPDATE locations SET latitude = $1, longitude = $2, altitude = $3, vehicle = $4 where id = $5;`,
                        [
                              coordinates.latitude,
                              coordinates.longitude,
                              coordinates.altitude,
                              vehicleId,
                              locationId,
                        ]
                  )
                  if (res === undefined) return false
                  return true
            } catch (err: unknown) {
                  console.error(
                        'Error executing query to update the Location for a vehicle'
                  )
                  return false
            }
      }
}
