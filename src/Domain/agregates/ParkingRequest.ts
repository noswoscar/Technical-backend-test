import { LocationRepository } from '../../Infra/Repositories/LocationRepository'
import { VehicleRepository } from '../../Infra/Repositories/VehicleRepository'

export class ParkingRequest {
      private vehicleId: number
      private locationId: string
      private locationRepository: LocationRepository
      private vehicleRepository: VehicleRepository
      constructor(
            vehicleId: number,
            locationId: string,
            locationRepository: LocationRepository,
            vehicleRepository: VehicleRepository
      ) {
            this.vehicleId = vehicleId
            this.locationId = locationId
            this.locationRepository = locationRepository
            this.vehicleRepository = vehicleRepository
      }

      parkVehicle = async (): Promise<boolean> => {
            const addedLocation =
                  await this.vehicleRepository.addLocationToVehicle(
                        this.locationId,
                        this.vehicleId
                  )
            const parkedVehicle =
                  await this.locationRepository.addVehicleToLocation(
                        this.vehicleId,
                        this.locationId
                  )
            if (addedLocation && parkedVehicle) return true
            return false
      }
}
