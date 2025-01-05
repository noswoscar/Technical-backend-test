import { LocationRepository } from '../../Infra/Repositories/LocationRepository'
import { Vehicle } from '../entities/Vehicle'
import { VehicleLocation } from '../entities/VehicleLocation'

export class ParkingRequest {
      private vehicleId: number
      private locationId: string
      private locationRepository
      constructor(
            vehicleId: number,
            locationId: string,
            locationRepository: LocationRepository
      ) {
            this.vehicleId = vehicleId
            this.locationId = locationId
            this.locationRepository = locationRepository
      }

      parkVehicle = (): Promise<boolean> => {
            return this.locationRepository.addVehicleToLocation(
                  this.vehicleId,
                  this.locationId
            )
      }
}
