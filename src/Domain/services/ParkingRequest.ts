import { LocationRepository } from '../../Infra/Repositories/LocationRepository'
import { ProgramError } from '../entities/ProgramError'
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

      vehicleAlreadyParkedAtLocation = async (): Promise<boolean> => {
            const alreadyParked =
                  await this.locationRepository.vehicleIsAtLocation(
                        this.locationId
                  )
            return alreadyParked
      }

      parkVehicle = async (): Promise<boolean> => {
            if (await this.vehicleAlreadyParkedAtLocation()) {
                  throw new Error('Vehicle is already added to this location.')
            }
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
