import { VehicleIdentity } from '../valueObjects/VehicleIdentity'

export class Vehicle {
      private vehicleIdentity: VehicleIdentity
      private locationId: string

      constructor(vehicleIdentity: VehicleIdentity, locationId: string) {
            this.vehicleIdentity = vehicleIdentity
            this.locationId = locationId
      }

      getLocationId = () => {
            return this.locationId
      }

      getVehicleIdentity = () => {
            return this.vehicleIdentity
      }

      setLocationId = (locationId: string) => {
            this.locationId = locationId
      }
}
