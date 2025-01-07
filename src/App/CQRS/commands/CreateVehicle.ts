import { DIContainer } from '../../DIContainer'
import { LocationRepository } from '../../../Infra/Repositories/LocationRepository'
import ParkingApp from '../../app'
import { Vehicle } from '../../../Domain/entities/Vehicle'
import { VehicleIdentity } from '../../../Domain/valueObjects/VehicleIdentity'
import { VehicleLocation } from '../../../Domain/entities/VehicleLocation'
import { VehicleRepository } from '../../../Infra/Repositories/VehicleRepository'

export class CreateVehicle {
      async execute(vehicle: Vehicle): Promise<number | undefined> {
            const vehicleRepository = new VehicleRepository()
            let res: number | undefined = await vehicleRepository.insert(
                  vehicle
            )

            if (!res) {
                  return undefined
            } else {
                  return res
            }
      }
}
