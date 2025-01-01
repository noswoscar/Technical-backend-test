import { DIContainer } from '../../DIContainer'
import ParkingApp from '../../app'
import { ParkingRequest } from '../../../Domain/agregates/ParkingRequest'
import { ProgramError } from '../../../Domain/entities/ProgramError'
import { Vehicle } from '../../../Domain/entities/Vehicle'
import { VehicleLocation } from '../../../Domain/entities/VehicleLocation'

export class ParkVehicleAtLocation {
      execute(vehicle: Vehicle, location: VehicleLocation) {
            const app = DIContainer.resolve<ParkingApp>('app')
            let parkingRequest = new ParkingRequest(vehicle, location)
            try {
                  parkingRequest.parkVehicle()
            } catch (error: any) {
                  let myerror = new ProgramError('ParkingError', error.message)
                  app.getErrorLog().setError(myerror)
                  app.getErrorLog().logError(myerror)
            } finally {
                  return
            }
      }
}
