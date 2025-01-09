import { LocationRepository } from '../../../Infra/Repositories/LocationRepository'
import { VehicleRepository } from '../../../Infra/Repositories/VehicleRepository'

export class VerifyVehicleAtLocation {
      async execute(vehicleId: number, locationId: string): Promise<boolean> {
            const vehicleRepository = new VehicleRepository()
            const vehicleLocation = await vehicleRepository.getVehicleLocation(
                  vehicleId
            )

            if (!vehicleLocation) {
                  return false
            }

            const locationRepository = new LocationRepository()
            const vehicleAtLocation =
                  await locationRepository.getVehicleAtLocation(vehicleLocation)

            if (vehicleId.toString() === vehicleAtLocation) {
                  return true
            }
            return false
      }
}
