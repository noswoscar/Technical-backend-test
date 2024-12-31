import { Location } from '../entities/Location'
import { Vehicle } from '../entities/Vehicle'

export class ParkingRequest {
      private vehicle: Vehicle
      private location: Location
      constructor(vehicle: Vehicle, location: Location) {
            this.vehicle = vehicle
            this.location = location
      }

      //rules
      verifyLocationIsFree = () => {
            if (this.location.isFree()) {
                  return true
            }
            return false
      }

      parkVehicle = () => {
            if (this.vehicle.getLocation().getId() === this.location.getId()) {
                  let errorMessage =
                        'the vehicle number ' +
                        this.vehicle.getVehicleId() +
                        ' is already parked at the location ' +
                        this.location.getId()
                  throw new Error(errorMessage)
            }
            this.location.setParkedVehicle(this.vehicle)
            this.vehicle.setLocation(this.location)
      }
}
