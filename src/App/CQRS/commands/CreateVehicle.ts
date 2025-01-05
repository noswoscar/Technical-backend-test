import { DIContainer } from '../../DIContainer'
import ParkingApp from '../../app'
import { Vehicle } from '../../../Domain/entities/Vehicle'
import { VehicleIdentity } from '../../../Domain/valueObjects/VehicleIdentity'
import { VehicleLocation } from '../../../Domain/entities/VehicleLocation'
import { VehicleRepository } from '../../../Infra/Repositories/VehicleRepository'
import { VehicleType } from '../../../Domain/valueObjects/VehicleType'

export class CreateVehicle {
      async execute(
            vehicleIdentity: VehicleIdentity,
            vehicleType: VehicleType
      ): Promise<number | undefined> {
            const app = DIContainer.resolve<ParkingApp>('app')
            let location = new VehicleLocation('60', '44', '340')
            let vehicle = new Vehicle(vehicleIdentity, location, vehicleType)

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
