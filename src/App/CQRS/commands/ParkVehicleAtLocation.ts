import { DIContainer } from '../../DIContainer'
import { LocationRepository } from '../../../Infra/Repositories/LocationRepository'
import ParkingApp from '../../app'
import { ParkingRequest } from '../../../Domain/agregates/ParkingRequest'
import { ProgramError } from '../../../Domain/entities/ProgramError'
import { VehicleRepository } from '../../../Infra/Repositories/VehicleRepository'

export class ParkVehicleAtLocation {
      async execute(vehicleId: number, locationId: string): Promise<boolean> {
            const app = DIContainer.resolve<ParkingApp>('app')
            const locationrepository = new LocationRepository()
            const vehiclerepository = new VehicleRepository()
            const parkingRequest = new ParkingRequest(
                  vehicleId,
                  locationId,
                  locationrepository,
                  vehiclerepository
            )
            try {
                  return await parkingRequest.parkVehicle()
            } catch (error: any) {
                  let myerror = new ProgramError('ParkingError', error.message)
                  app.getErrorLog().setError(myerror)
                  app.getErrorLog().logError(myerror)
                  return false
            }
      }
}
