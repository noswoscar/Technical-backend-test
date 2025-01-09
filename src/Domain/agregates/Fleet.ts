import { ProgramError } from '../entities/ProgramError'
import { ErrorLog } from '../services/ErrorLog'
import { FleetIdentity } from '../valueObjects/FleetIdentity'

export class Fleet {
      private fleetIdentity: FleetIdentity
      private vehicleIds: Array<number>

      constructor(fleetIdentity: FleetIdentity, vehicleIds: Array<number>) {
            this.fleetIdentity = fleetIdentity
            this.vehicleIds = vehicleIds
      }

      private isVehicleRegistered = (newVehicleId: number): boolean => {
            const vehicleRegistered = this.vehicleIds.includes(newVehicleId)
            return vehicleRegistered
      }

      registerVehicle = (vehicleId: number, errorLog: ErrorLog): boolean => {
            const vehicleRegistered = this.isVehicleRegistered(vehicleId)

            if (vehicleRegistered) {
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

      verifyVehicleInFleet = (vehicleId: number) => {
            return this.isVehicleRegistered(vehicleId)
      }

      getFleetIdentity = () => {
            return this.fleetIdentity
      }
}
