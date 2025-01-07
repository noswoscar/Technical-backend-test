import { FleetIdentity } from '../valueObjects/FleetIdentity'
import { Vehicle } from '../entities/Vehicle'

export class Fleet {
      private fleetIdentity: FleetIdentity
      private vehicles: Array<Vehicle>

      constructor(fleetIdentity: FleetIdentity, vehicles: Array<Vehicle>) {
            this.fleetIdentity = fleetIdentity
            this.vehicles = vehicles
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
                              vehicleItem
                                    .getVehicleIdentity()
                                    .getVehiclePlateNumber() ===
                              vehicle
                                    .getVehicleIdentity()
                                    .getVehiclePlateNumber()
                  )
            ) {
                  return true
            }
            return false
      }

      getFleetidentity = () => {
            return this.fleetIdentity
      }

      getVehiclesPlateNumbers = () => {
            let numberPlates = this.vehicles.map((vehicle) =>
                  vehicle.getVehicleIdentity().getVehiclePlateNumber()
            )
            return numberPlates
      }
}
