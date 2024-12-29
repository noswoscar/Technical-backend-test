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
            this.fleet.setVehicle(this.vehicle)
      }
}
