// import { Error } from '../entities/Error'
import { ErrorLog } from './ErrorLog'
import { Fleet } from '../entities/Fleet'
import { Vehicle } from '../entities/Vehicle'

export class RegistryRequest {
      private vehicle: Vehicle
      private fleet: Fleet
      constructor(vehicle: Vehicle, fleet: Fleet) {
            this.vehicle = vehicle
            this.fleet = fleet
      }
      registerVehicleToFleet = () => {
            if (this.fleet.hasVehicle(this.vehicle)) {
                  let errorMessage =
                        'the vehicle number ' +
                        this.vehicle.getVehicleNumberPlate() +
                        ' has already been registered into the fleet number ' +
                        this.fleet.getFleetId()
                  throw new Error(errorMessage)
            } else {
                  this.fleet.setVehicle(this.vehicle)
            }
      }
}
