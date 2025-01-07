import { ErrorLog } from '../services/ErrorLog'
import { FleetIdentity } from '../valueObjects/FleetIdentity'
import { ProgramError } from '../entities/ProgramError'
import { Vehicle } from '../entities/Vehicle'
import { registerVehicleToFleet } from '../../App/CQRS/commands/RegisterVehicleToFleet'

export class Fleet {
      private fleetIdentity: FleetIdentity
      private vehicleIds: Array<number>

      constructor(fleetIdentity: FleetIdentity, vehicleIds: Array<number>) {
            this.fleetIdentity = fleetIdentity
            this.vehicleIds = vehicleIds
      }

      verifyVehicleInFleet = (vehicleId: number) => {
            return this.vehicleIds.includes(vehicleId)
      }

      verifyAlreadyRegistered = (newVehicleId: number): boolean => {
            const alreadyRegistered = this.vehicleIds.includes(newVehicleId)
            return alreadyRegistered
      }

      registerVehicle = (vehicleId: number, errorLog: ErrorLog): boolean => {
            const alreadyRegistered = this.verifyAlreadyRegistered(vehicleId)

            if (alreadyRegistered) {
                  const registryError = new ProgramError(
                        'RegistryError',
                        'The vehicle was already registered'
                  )
                  errorLog.setError(registryError)
                  errorLog.logError(registryError)
                  return false
            }
            this.vehicleIds.push(vehicleId)
            return true
      }

      getVehicleIds = () => {
            return this.vehicleIds
      }

      setVehicleId = (vehicle: Vehicle) => {
            this.vehicleIds.push(vehicle.getVehicleIdentity().getVehicleId())
      }

      // hasVehicle = (vehicle: Vehicle) => {
      //       if (
      //             this.vehicles.find(
      //                   (vehicleItem) =>
      //                         vehicleItem
      //                               .getVehicleIdentity()
      //                               .getVehiclePlateNumber() ===
      //                         vehicle
      //                               .getVehicleIdentity()
      //                               .getVehiclePlateNumber()
      //             )
      //       ) {
      //             return true
      //       }
      //       return false
      // }

      getIdentity = () => {
            return this.fleetIdentity
      }

      getVehiclesPlateNumbers = () => {
            //for each vehicleId (SELECT each vehicle seperately)
            //get corresponding numberplate and save to numberplate array
            //return numberplate array
      }
}
