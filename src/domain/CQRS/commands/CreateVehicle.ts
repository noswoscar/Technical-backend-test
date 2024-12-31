import { DIContainer } from '../../../app/DIContainer'
import { Location } from '../../entities/Location'
import ParkingApp from '../../../app/app'
import { Vehicle } from '../../entities/Vehicle'
import { VehicleIdentity } from '../../../valueObjects/VehicleIdentity'
import { VehicleType } from '../../../valueObjects/VehicleType'

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
