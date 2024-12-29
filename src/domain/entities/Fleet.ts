import { FleetIdentity } from '../../valueObjects/FleetIdentity'
import { Vehicle } from './Vehicle'

export class Fleet {
      private fleetIdentity: FleetIdentity
      private vehicles: Array<Vehicle>

      constructor(fleetIdentity: FleetIdentity, vehicles: Array<Vehicle>) {
            this.fleetIdentity = fleetIdentity
            this.vehicles = vehicles
      }

      getFleetIdentity = () => {
            return this.fleetIdentity
      }

      getVehicles = () => {
            return this.vehicles
      }

      setVehicle = (vehicle: Vehicle) => {
            this.vehicles.push(vehicle)
      }
}
