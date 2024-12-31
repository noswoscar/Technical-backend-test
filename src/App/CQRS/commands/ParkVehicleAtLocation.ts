import { DIContainer } from '../../DIContainer'
import { Location } from '../../../Domain/entities/Location'
import ParkingApp from '../../app'
import { ParkingRequest } from '../../../Domain/agregates/ParkingRequest'
import { ProgramError } from '../../../Domain/entities/ProgramError'
import { Vehicle } from '../../../Domain/entities/Vehicle'

export class ParkVehicleAtLocation {
      execute(vehicle: Vehicle, location: Location) {
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
