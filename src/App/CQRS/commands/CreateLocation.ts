import { DIContainer } from '../../DIContainer'
import ParkingApp from '../../app'
import { Vehicle } from '../../../Domain/entities/Vehicle'
import { VehicleLocation } from '../../../Domain/entities/VehicleLocation'

export class CreateLocation {
      execute(
            latitude: string,
            longitude: string,
            altitude: string | 0
      ): VehicleLocation {
            const app = DIContainer.resolve<ParkingApp>('app')
            let location = new VehicleLocation(latitude, longitude, altitude)
            app.getLocations().push(location)
            return location
      }
}
