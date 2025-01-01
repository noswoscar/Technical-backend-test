import { DIContainer } from '../../DIContainer'
import ParkingApp from '../../app'
import { Vehicle } from '../../../Domain/entities/Vehicle'
import { VehicleLocation } from '../../../Domain/entities/VehicleLocation'

export class VerifyVehicleAtLocation {
      execute(vehicle: Vehicle, location: VehicleLocation): boolean {
            const app = DIContainer.resolve<ParkingApp>('app')
            if (vehicle.getLocation() === location) {
                  //verify this better
                  return true
            }
            return false
      }
}
