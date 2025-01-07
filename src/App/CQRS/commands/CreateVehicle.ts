import { DIContainer } from '../../DIContainer'
import { LocationRepository } from '../../../Infra/Repositories/LocationRepository'
import ParkingApp from '../../app'
import { Vehicle } from '../../../Domain/entities/Vehicle'
import { VehicleIdentity } from '../../../Domain/valueObjects/VehicleIdentity'
import { VehicleLocation } from '../../../Domain/entities/VehicleLocation'
import { VehicleRepository } from '../../../Infra/Repositories/VehicleRepository'

export class CreateVehicle {
      async execute(
            vehicleIdentity: VehicleIdentity
      ): Promise<number | undefined> {
            const app = DIContainer.resolve<ParkingApp>('app')
            let location = new VehicleLocation('0', '0', '340')

            const locationRepository = new LocationRepository()
            let createdLocationId = await locationRepository.insert(location)
            if (!createdLocationId) {
                  return undefined
            }
            let vehicle = new Vehicle(vehicleIdentity, createdLocationId)

            //memory code
            app.getVehicles().push(vehicle)

            //db code
            const vehicleRepository = new VehicleRepository()
            let res = await vehicleRepository.insert(vehicle)
            if (!res) {
                  return undefined
            } else {
                  return res
            }
      }
}
