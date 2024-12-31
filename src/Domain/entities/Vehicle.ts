import { Location } from './Location'
import { VehicleIdentity } from '../valueObjects/VehicleIdentity'
import { VehicleType } from '../valueObjects/VehicleType'

export class Vehicle {
      private vehicleIdentity: VehicleIdentity
      private location: Location
      private vehicleType: VehicleType
      constructor(
            vehicleIdentity: VehicleIdentity,
            location: Location,
            vehicleType: VehicleType
      ) {
            this.vehicleIdentity = vehicleIdentity
            this.location = location
            this.vehicleType = vehicleType
      }

      getVehicleId = () => {
            return this.vehicleIdentity.vehicleId
      }

      setLocation = (location: Location) => {
            this.location = location
      }

      getLocation = () => {
            return this.location
      }
}
