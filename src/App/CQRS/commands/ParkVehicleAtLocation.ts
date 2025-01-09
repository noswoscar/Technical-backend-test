import { ProgramError } from '../../../Domain/entities/ProgramError'
import { ErrorLog } from '../../../Domain/services/ErrorLog'
import { ParkingRequest } from '../../../Domain/services/ParkingRequest'
import { LocationRepository } from '../../../Infra/Repositories/LocationRepository'
import { VehicleRepository } from '../../../Infra/Repositories/VehicleRepository'

export class ParkVehicleAtLocation {
      async execute(
            vehicleId: number,
            locationId: string,
            errorLog: ErrorLog
      ): Promise<boolean> {
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
                  errorLog.setError(myerror)
                  errorLog.logError(myerror)
                  return false
            }
      }
}
