import { DIContainer } from '../../DIContainer'
import { Fleet } from '../../../Domain/entities/Fleet'
import ParkingApp from '../../app'
import { Vehicle } from '../../../Domain/entities/Vehicle'

export class VerifyVehicleInFleet {
      execute(vehicle: Vehicle, fleet: Fleet) {
            const app = DIContainer.resolve<ParkingApp>('app')
            if (
                  fleet
                        .getVehicles()
                        .find(
                              (vehicleItem) =>
                                    vehicleItem.getVehicleId() ===
                                    vehicle.getVehicleId()
                        )
            ) {
                  return true
            }
            return false
      }
}
