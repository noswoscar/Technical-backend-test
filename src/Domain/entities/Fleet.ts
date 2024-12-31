import { FleetIdentity } from '../valueObjects/FleetIdentity'
import { Vehicle } from './Vehicle'

export class Fleet {
      private fleetIdentity: FleetIdentity
      private vehicles: Array<Vehicle>

      constructor(fleetIdentity: FleetIdentity, vehicles: Array<Vehicle>) {
            this.fleetIdentity = fleetIdentity
            this.vehicles = vehicles
      }

      getFleetId = () => {
            return this.fleetIdentity.id
      }

      getFleetName = () => {
            return this.fleetIdentity.name
      }

      getVehicles = () => {
            return this.vehicles
      }

      setVehicle = (vehicle: Vehicle) => {
            this.vehicles.push(vehicle)
      }

      hasVehicle = (vehicle: Vehicle) => {
            if (
                  this.vehicles.find(
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
