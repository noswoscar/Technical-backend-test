import { DIContainer } from '../../../app/DIContainer'
import { Location } from '../../entities/Location'
import ParkingApp from '../../../app/app'
import { ParkingRequest } from '../../agregates/ParkingRequest'
import { ProgramError } from '../../entities/ProgramError'
import { Vehicle } from '../../entities/Vehicle'

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
