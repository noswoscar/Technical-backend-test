import { DIContainer } from '../../DIContainer'
import { Location } from '../../../Domain/entities/Location'
import ParkingApp from '../../app'
import { Vehicle } from '../../../Domain/entities/Vehicle'

export class VerifyVehicleAtLocation {
      execute(vehicle: Vehicle, location: Location): boolean {
            const app = DIContainer.resolve<ParkingApp>('app')
            if (vehicle.getLocation().getId() === location.getId()) {
                  return true
            }
            return false
      }
}
