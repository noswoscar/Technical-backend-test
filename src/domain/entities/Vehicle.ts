import { Location } from './Location'
import { VehicleIdentity } from '../../valueObjects/VehicleIdentity'

export class Vehicle {
      private vehicleIdentity: VehicleIdentity
      private location: Location
      constructor(vehicleIdentity: VehicleIdentity, location: Location) {
            this.vehicleIdentity = vehicleIdentity
            this.location = location
      }
}
