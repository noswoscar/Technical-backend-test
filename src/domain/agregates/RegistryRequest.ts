import { Error } from '../entities/Error'
import { ErrorLog } from './ErrorLog'
import { Fleet } from '../entities/Fleet'
import { Vehicle } from '../entities/Vehicle'

export class RegistryRequest {
      private vehicle: Vehicle
      private fleet: Fleet
      private errorLog: ErrorLog
      constructor(vehicle: Vehicle, fleet: Fleet, errorLog: ErrorLog) {
            this.vehicle = vehicle
            this.fleet = fleet
            this.errorLog = errorLog
      }
      registerVehicleToFleet = () => {
            if (this.fleet.hasVehicle(this.vehicle)) {
                  let errorMessage =
                        'the vehicle number ' +
                        this.vehicle.getVehicleId() +
                        ' has already been registered into the fleet number ' +
                        this.fleet.getFleetId()
                  let error = new Error('RegistryError', errorMessage)
                  this.errorLog.setError(error)
                  this.errorLog.logError(error)
            } else {
                  this.fleet.setVehicle(this.vehicle)
            }
      }
}
