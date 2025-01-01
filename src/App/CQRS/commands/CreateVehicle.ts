import { DIContainer } from '../../DIContainer'
import ParkingApp from '../../app'
import { Vehicle } from '../../../Domain/entities/Vehicle'
import { VehicleIdentity } from '../../../Domain/valueObjects/VehicleIdentity'
import { VehicleLocation } from '../../../Domain/entities/VehicleLocation'
import { VehicleType } from '../../../Domain/valueObjects/VehicleType'

export class CreateVehicle {
      execute(
            vehicleIdentity: VehicleIdentity,
            vehicleType: VehicleType
      ): Vehicle {
            const app = DIContainer.resolve<ParkingApp>('app')

            let location = new VehicleLocation('0', '0', '0')
            let vehicle = new Vehicle(vehicleIdentity, location, vehicleType)
            app.getVehicles().push(vehicle)
            return vehicle
      }
}
