import { DIContainer } from '../../App/DIContainer'
import { DatabaseConnector } from '../DatabaseConnector'
import { Vehicle } from '../../Domain/entities/Vehicle'

export class VehicleRepository {
      constructor() {}
      find = () => {}

      insert = async (vehicle: Vehicle) => {
            const dbConnector: DatabaseConnector =
                  DIContainer.resolve<DatabaseConnector>('dbConnector')
            const client = dbConnector.getClient()
            const res = await client.query(
                  'INSERT INTO vehicles (number_plate, latitude, longitude, altitude, type, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING number_plate;',
                  [
                        vehicle.getVehicleNumberPlate(),
                        vehicle.getLocation().getCoordinates().latitude,
                        vehicle.getLocation().getCoordinates().longitude,
                        vehicle.getLocation().getCoordinates().altitude,
                        vehicle.getVehicleType(),
                  ]
            )
      }

      update = () => {}

      delete = () => {}
}
