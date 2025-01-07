import { DIContainer } from '../../DIContainer'
import { LocationRepository } from '../../../Infra/Repositories/LocationRepository'
import ParkingApp from '../../app'
import { ParkingRequest } from '../../../Domain/services/ParkingRequest'
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
            } catch (error: unknown) {
                  let myerror = new ProgramError(
                        'ParkingError',
                        'Error parking a vehicle at a location'
                  )
                  app.getErrorLog().setError(myerror)
                  app.getErrorLog().logError(myerror)
                  return false
            }
      }
}
