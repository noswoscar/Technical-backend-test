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
      ): Promise<Vehicle> {
            const app = DIContainer.resolve<ParkingApp>('app')

            let location = new VehicleLocation('60', '44', '340')
            let vehicle = new Vehicle(vehicleIdentity, location, vehicleType)
            app.getVehicles().push(vehicle)
            const vehicleRepository = new VehicleRepository()
            await vehicleRepository.insert(vehicle)
            return vehicle
      }
}
