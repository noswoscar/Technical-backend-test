import { DIContainer } from '../../DIContainer'
import { Location } from '../../../Domain/entities/Location'
import ParkingApp from '../../app'
import { Vehicle } from '../../../Domain/entities/Vehicle'
import { VehicleIdentity } from '../../../Domain/valueObjects/VehicleIdentity'
import { VehicleType } from '../../../Domain/valueObjects/VehicleType'

export class CreateVehicle {
      execute(
            vehicleIdentity: VehicleIdentity,
            vehicleType: VehicleType
      ): Vehicle {
            const app = DIContainer.resolve<ParkingApp>('app')

            let location = new Location()
            let vehicle = new Vehicle(vehicleIdentity, location, vehicleType)
            app.getVehicles().push(vehicle)
            return vehicle
      }
}
