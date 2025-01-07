import { DIContainer } from '../../DIContainer'
import { LocationRepository } from '../../../Infra/Repositories/LocationRepository'
import ParkingApp from '../../app'
import { VehicleLocation } from '../../../Domain/entities/VehicleLocation'

export class CreateLocation {
      async execute(
            latitude: string,
            longitude: string,
            altitude: string | 0
      ): Promise<string | undefined> {
            const app = DIContainer.resolve<ParkingApp>('app')
            let location = new VehicleLocation(latitude, longitude, altitude)
            const locationRepository = new LocationRepository()
            const result: string | undefined = await locationRepository.insert(
                  location
            )
            if (!result) {
                  return undefined
            }
            return result
      }
}
