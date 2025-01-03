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
      ): Promise<QueryResult> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            const res = await client.query(
                  'select * from fleets where fleet_id = $1',
                  [fleet.getFleetId()]
            )
            console.log('queryresult findvehicleinfleet: ', res)
            return res
      }

      insert = async (fleet: Fleet) => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            const res = await client.query(
                  'INSERT INTO fleets (fleet_id, fleet_name, created_at, vehicles) VALUES ($1, $2, NOW(), $3) RETURNING fleet_id;',
                  [
                        fleet.getFleetId(),
                        fleet.getFleetName(),
                        fleet.getVehiclesPlates(),
                  ]
            )
            return res
      }

      update = () => {}

      debugQuery = (fleet: Fleet) => {
            // const params = [, ]
            // // Format the query for debugging
            // const formattedQuery = query.replace(/\$(\d+)/g, (match, index) => {
            //       const paramIndex = parseInt(index, 10) - 1
            //       const paramValue = params[paramIndex]
            //       return typeof paramValue === 'string'
            //             ? `'${paramValue}'`
            //             : paramValue
            // })
      }

      updateVehicles = async (
            fleet: Fleet
      ): Promise<QueryResult<any> | undefined> => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            console.log(
                  'updating : ',
                  fleet.getFleetId(),
                  ' with ',
                  fleet.getVehiclesPlates()
            )

            // const querystr = `UPDATE fleets SET fleet_name = 'Oscar' WHERE fleet_id = ${fleet.getFleetId()};`
            // console.log('Query string = ', querystr)
            try {
                  const res = await client.query(
                        `UPDATE fleets SET vehicles = $2 WHERE fleet_id = $1;`,
                        [fleet.getFleetId(), fleet.getVehiclesPlates()]
                  )
                  console.log('queryresult updateVehicle: ', res)
                  return res
            } catch (err: any) {
                  console.error('Error executing query:', err.message)
                  console.error('PostgreSQL error code:', err.code)
                  console.error('Detailed error:', err)
            }
      }

      delete = () => {}
}
