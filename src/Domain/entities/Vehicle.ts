import { VehicleIdentity } from '../valueObjects/VehicleIdentity'
import { VehicleLocation } from './VehicleLocation'
import { VehicleType } from '../valueObjects/VehicleType'

export class Vehicle {
      private vehicleIdentity: VehicleIdentity
      private location: VehicleLocation
      private vehicleType: VehicleType
      constructor(
            vehicleIdentity: VehicleIdentity,
            location: VehicleLocation,
            vehicleType: VehicleType
      ) {
            this.vehicleIdentity = vehicleIdentity
            this.location = location
            this.vehicleType = vehicleType
      }

      getVehicleNumberPlate = () => {
            return this.vehicleIdentity.getVehicleNumberPlate()
      }

      setLocation = (location: VehicleLocation) => {
            this.location = location
      }

      getLocation = () => {
            return this.location
      }
}
