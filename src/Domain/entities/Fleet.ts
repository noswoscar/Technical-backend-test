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
            return this.fleetIdentity.getId()
      }

      getFleetName = () => {
            return this.fleetIdentity.getUserName()
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
                              vehicleItem.getVehicleNumberPlate() ===
                              vehicle.getVehicleNumberPlate()
                  )
            ) {
                  return true
            }
            return false
      }
}
