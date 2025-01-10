import { Fleet } from '../../../Domain/agregates/Fleet'
import { LocationRepository } from '../../../Infra/Repositories/LocationRepository'
import { VehicleRepository } from '../../../Infra/Repositories/VehicleRepository'

export class LocalizeVehicle {
      async execute(
            fleet: Fleet,
            vehiclePlateNumber: number,
            latitude: string,
            longitude: string,
            altitude: string
      ): Promise<boolean> {
            const vehicleRepository = new VehicleRepository()
            const locationRepository = new LocationRepository()
            const vehicleId = await vehicleRepository.findByPlate(
                  vehiclePlateNumber
            )
            if (!vehicleId) return false
            const locationId: string | undefined =
                  await vehicleRepository.getVehicleLocation(vehicleId)
            if (!locationId) return false
            const coordinates = {
                  latitude: latitude,
                  longitude: longitude,
                  altitude: altitude,
            }
            const res: boolean = await locationRepository.updateLocation(
                  locationId,
                  vehicleId,
                  coordinates
            )
            if (!res) return false
            return true
      }
}
